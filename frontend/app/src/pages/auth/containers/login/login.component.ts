import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormLoginModule } from '../../components';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormLoginModule,
      RouterModule,
    ],
})
export class LoginComponent {
  title = 'frontend-app';
}
