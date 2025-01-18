import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormResetPassModule } from '../../components';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
  imports: [CommonModule, FormResetPassModule, RouterModule],
})
export class ResetPassComponent {}
