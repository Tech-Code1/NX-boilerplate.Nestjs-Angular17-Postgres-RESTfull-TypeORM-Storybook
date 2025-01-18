import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  LabelComponent,
  TitleComponent,
} from '@ui/components';
import { FormUtilitiesService, ValidatorsService } from '@utils';
import { ResetStateService } from '../../../service/state';

@Component({
  selector: 'form-change-pass',
  templateUrl: './form-change-pass.component.html',
  styleUrls: ['./form-change-pass.component.scss'],
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
export class FormChangePassComponent implements OnInit {
  private resetStateService = inject(ResetStateService);
  private formBuilder = inject(FormBuilder);
  protected validatorsService = inject(ValidatorsService);
  protected formUtilities = inject(FormUtilitiesService);

  customValidator!: ValidatorFn;
  formChangePass!: FormGroup;

  ngOnInit(): void {
    this.customValidator = this.validatorsService.similarInputs(
      'newPassword',
      'repeatPassword'
    );

    this.formChangePass = this.formBuilder.group(
      {
        currentPassword: [''],
        newPassword: [''],
        repeatPassword: [''],
      },
      {
        validators: this.customValidator,
      }
    );
  }
  onReset(): void {
    if (!this.formChangePass.valid) return;

    this.resetStateService.onResetPassword(this.formChangePass);
  }
}
