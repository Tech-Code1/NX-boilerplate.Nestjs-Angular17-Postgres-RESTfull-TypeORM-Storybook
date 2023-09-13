import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormUtilitiesService, ValidatorsService } from '@utils';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ResetStateService } from '../../../service/state';

@Component({
  selector: 'form-reset-pass',
  templateUrl: './form-reset-pass.component.html',
  styleUrls: ['./form-reset-pass.component.scss'],
})
export class FormResetPassComponent implements OnInit, OnDestroy {
  private resetStateService = inject(ResetStateService);
  private formBuilder = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  protected formUtilities = inject(FormUtilitiesService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  formReset!: FormGroup;
  password$ = this.passwordSource.asObservable();

  get passwordControl(): FormControl {
    return this.formReset.get('password') as FormControl;
  }

  get passRepeatControl(): FormControl {
    return this.formReset.get('passRepeat') as FormControl;
  }

  ngOnInit(): void {
    this.formReset = this.formBuilder.group({
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
    if (!this.formReset.valid) return;

    this.resetStateService.onResetPassword(this.formReset);
  }
}
