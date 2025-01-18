import { Component } from '@angular/core';
import { FormLoginComponent } from '../../components';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      FormLoginComponent,
    ],
})
export class LoginComponent {}
