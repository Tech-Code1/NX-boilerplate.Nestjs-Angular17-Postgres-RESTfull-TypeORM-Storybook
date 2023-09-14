import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilitiesService, ValidatorsService } from '@utils';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ResetStateService } from '../../../service/state';

@Component({
  selector: 'form-change-pass',
  templateUrl: './form-change-pass.component.html',
  styleUrls: ['./form-change-pass.component.scss'],
})
export class FormChangePassComponent implements OnInit, OnDestroy {
  private resetStateService = inject(ResetStateService);
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  protected formUtilities = inject(FormUtilitiesService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  formChangePass!: FormGroup;
  password$ = this.passwordSource.asObservable();

  ngOnInit(): void {
    this.formChangePass = this.formBuilder.group({
      currentPassword: [''],
      newPassword: [''],
    });

    /* this.passwordSubscription = this.password$.subscribe((pass) => {
      const control = this.formReset.get('password');
      if (control) {
        control.setValidators([
          this.validatorsService.similarInputs(pass!, 'passRepeat'),
        ]);
        control.updateValueAndValidity();
      }
    }); */
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }

  onReset(): void {
    if (!this.formChangePass.valid) return;

    this.resetStateService.onResetPassword(this.formChangePass);
  }
}
