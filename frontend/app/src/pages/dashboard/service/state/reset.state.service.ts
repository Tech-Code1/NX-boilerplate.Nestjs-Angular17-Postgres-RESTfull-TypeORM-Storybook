import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetStateService {
  router = inject(Router);
  BASE_API: string = environment.baseUrl;
}
