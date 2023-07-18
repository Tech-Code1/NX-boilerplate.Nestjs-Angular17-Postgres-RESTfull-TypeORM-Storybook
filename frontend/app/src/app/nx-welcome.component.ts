import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nx-boilerplate-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
