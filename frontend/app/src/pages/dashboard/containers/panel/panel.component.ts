import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { LoginStateService } from '../../../auth/service/state';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    TitleComponent,
  ],
})
export class PanelComponent {
  private loginService = inject(LoginStateService);

  public user = computed(() => this.loginService.currentUser());

  onLogout() {
    this.loginService.logout();
  }
}
