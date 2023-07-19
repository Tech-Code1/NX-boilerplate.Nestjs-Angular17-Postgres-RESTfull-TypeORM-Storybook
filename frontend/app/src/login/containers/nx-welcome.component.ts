import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nx-boilerplate-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../components/login/app.component.scss'],
  templateUrl: '../components/login/app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
