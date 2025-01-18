import { Component } from '@angular/core';
import { FormChangePassComponent } from '../../components';

@Component({
  selector: 'change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
  standalone: true,
  imports: [
    FormChangePassComponent
  ],
})
export class ChangePassComponent {}
