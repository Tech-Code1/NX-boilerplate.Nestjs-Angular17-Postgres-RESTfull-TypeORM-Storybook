import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponent, TitleComponent } from '@ui/components';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
];

@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ButtonComponent,
    TitleComponent,
  ],
  exports: [PanelComponent, RouterModule],
})
export class PanelModule {}
