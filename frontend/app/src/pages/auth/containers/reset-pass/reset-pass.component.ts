import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormResetPassComponent } from '../../components';

@Component({
  selector: 'reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
  imports: [CommonModule, FormResetPassComponent, RouterModule],
})
export class ResetPassComponent {}
