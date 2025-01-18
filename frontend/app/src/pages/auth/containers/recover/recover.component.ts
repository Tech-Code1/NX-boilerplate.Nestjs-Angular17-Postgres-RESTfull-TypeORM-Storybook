import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormRecoverModule } from '../../components';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRecoverModule,
    RouterModule,
  ],
})
export class RecoverComponent {}
