import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormRecoverComponent } from '../../components';

@Component({
  selector: 'recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRecoverComponent,
    RouterModule,
  ],
})
export class RecoverComponent {}
