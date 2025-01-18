import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
    selector: 'layout-auth',
    templateUrl: './layout-auth.component.html',
    styleUrls: ['./layout-auth.component.scss'],
    imports: [CommonModule, RouterModule, RouterLinkActive],
})
export class LayoutAuthComponent {
  title = 'frontend-app';
}
