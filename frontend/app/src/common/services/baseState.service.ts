import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, take, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IApiOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe: 'events';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export class StateBase<T> {
  resources: T[] = [];
  selecttedResource: T | undefined = undefined;
  isLoading = false;
  errorsOnLoading = false;
  isLoadingUpdate = false;
  errorsOnUpdating = false;
  isLoadingDelete = false;
  errorsOnDeleting = false;
  isLoadingCreate = false;
  errorsOnCreate = false;
}

@Injectable({
  providedIn: 'root',
})
export class BaseStateService<T, StateClass extends StateBase<T>> {
  protected readonly http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;
  key: keyof T = 'id' as keyof T;
  initialData: StateClass = new StateBase() as StateClass;
  state = signal<StateClass>(this.initialData);

  protected get(url: string /* apiOptions: IApiOptions */): Observable<T[]> {
    this.updateState({ isLoading: true, errorsOnLoading: false });
    return this.http.get<T[]>(url /* apiOptions */).pipe(
      take(1),
      catchError((err) =>
        this._catchError(err, { errorsOnLoading: true, isLoading: false })
      ),
      tap((resources: T[]) =>
        this.updateState({
          resources,
          isLoading: false,
          errorsOnLoading: false,
        })
      )
    );
  }

  protected update(
    url: string,
    item: T
    /* apiOptions: IApiOptions */
  ): Observable<T> {
    this.updateState({ isLoadingUpdate: true, errorsOnUpdating: false });
    return this.http.put<T>(url, item /* apiOptions */).pipe(
      take(1),
      catchError((err) =>
        this._catchError(err, {
          errorsOnUpdating: true,
          isLoadingUpdate: false,
        })
      ),
      tap((item: T) => {
        const resources = this.upsertResource(item, this.state().resources);
        this.updateState({
          resources,
          isLoadingUpdate: false,
          errorsOnUpdating: false,
        });
      })
    );
  }

  protected create(
    url: string,
    item: T
    /* apiOptions: IApiOptions */
  ): Observable<T> {
    this.updateState({ isLoadingCreate: true, errorsOnCreate: false });
    return this.http.post<T>(url, item /* apiOptions */).pipe(
      take(1),
      catchError((err) =>
        this._catchError(err, {
          errorsOnCreate: true,
          isLoadingCreate: false,
        })
      ),
      tap((item: T) => {
        const resources = this.upsertResource(item, this.state().resources);
        this.updateState({
          resources,
          isLoadingCreate: false,
          errorsOnCreate: false,
        });
      })
    );
  }

  protected delete(
    url: string,
    item: T
    /* apiOptions: IApiOptions */
  ): Observable<void> {
    this.updateState({ isLoadingDelete: true, errorsOnDeleting: false });
    return this.http.delete<void>(url /* apiOptions */).pipe(
      take(1),
      catchError((err) =>
        this._catchError(err, {
          errorsOnDeleting: true,
          isLoadingDelete: false,
        })
      ),
      tap(() => {
        const resources = this.state().resources.filter(
          (r) => r[this.key] !== item[this.key]
        );
        this.updateState({
          resources,
          isLoadingDelete: false,
          errorsOnDeleting: false,
        });
      })
    );
  }

  protected upsertResource(item: T, resources: T[]): T[] {
    const index = resources.findIndex((i) => i[this.key] === item[this.key]);
    index > -1 ? (resources[index] = item) : resources.push(item);

    return resources;
  }

  protected updateState(newState: Partial<StateBase<T>>) {
    this.state.set({
      ...this.state(),
      ...newState,
    });
  }

  protected _catchError(err: any, newState: Partial<StateBase<T>>) {
    this.updateState(newState);
    return throwError(() => new Error(err.message));
  }
}
