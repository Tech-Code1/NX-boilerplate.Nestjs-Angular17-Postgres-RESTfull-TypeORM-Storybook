import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormRecoverModule } from '../../';
import { RecoverComponent } from './recover.component';

const routes: Routes = [
  {
    path: '',
    component: RecoverComponent,
  },
];

@NgModule({
  declarations: [RecoverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRecoverModule,
    RouterModule.forChild(routes),
  ],
  exports: [RecoverComponent, RouterModule],
})
export class RecoverModule {}
