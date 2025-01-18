import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent, InputComponent, LabelComponent, TitleComponent } from '@ui/components';
import { FormUtilitiesService } from '@utils';
import { RecoverStateService } from '../../../service/state';

@Component({
  selector: 'form-recover',
  templateUrl: './form-recover.component.html',
  styleUrls: ['./form-recover.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
})
export class FormRecoverComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  recoverService = inject(RecoverStateService);
  protected formUtilities = inject(FormUtilitiesService);

  formRecover!: FormGroup;

  ngOnInit(): void {
    this.formRecover = this.formBuilder.group({
      email: [''],
    });
  }

  onRecoverPassword() {
    if (!this.formRecover.valid) return;

    this.recoverService.onRecoverPassword(this.formRecover);
  }
}
