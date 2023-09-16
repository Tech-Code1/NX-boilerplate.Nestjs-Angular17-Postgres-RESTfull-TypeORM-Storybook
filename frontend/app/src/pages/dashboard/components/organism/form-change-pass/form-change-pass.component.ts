import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { FormUtilitiesService, ValidatorsService } from '@utils';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ResetStateService } from '../../../service/state';

@Component({
  selector: 'form-change-pass',
  templateUrl: './form-change-pass.component.html',
  styleUrls: ['./form-change-pass.component.scss'],
})
export class FormChangePassComponent implements OnInit {
  private resetStateService = inject(ResetStateService);
  private formBuilder = inject(FormBuilder);
  protected validatorsService = inject(ValidatorsService);
  protected formUtilities = inject(FormUtilitiesService);
  customValidator!: ValidatorFn;

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  formChangePass!: FormGroup;
  password$ = this.passwordSource.asObservable();
  currentPasswordValidators: ValidatorFn[] = [];

  ngOnInit(): void {
    this.customValidator = this.validatorsService.similarInputs(
      'currentPassword',
      'newPassword'
    );

    this.formChangePass = this.formBuilder.group(
      {
        currentPassword: [''],
        newPassword: [''],
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
