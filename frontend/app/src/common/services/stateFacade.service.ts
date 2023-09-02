import { Injectable, inject } from '@angular/core';
import { LoginService } from '../../pages/auth/service/login.service';

@Injectable({
  providedIn: 'root',
})
export class StateFacadeService {
  readonly loginService = inject(LoginService);
}
