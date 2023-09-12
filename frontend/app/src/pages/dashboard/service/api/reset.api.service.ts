import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetApiService {
  private http = inject(HttpClient);
  BASE_API: string = environment.baseUrl;
}
