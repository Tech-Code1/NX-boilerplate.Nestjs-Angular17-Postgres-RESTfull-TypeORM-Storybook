import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../components';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormRegisterComponent,
  ],
})
export class RegisterComponent {}
