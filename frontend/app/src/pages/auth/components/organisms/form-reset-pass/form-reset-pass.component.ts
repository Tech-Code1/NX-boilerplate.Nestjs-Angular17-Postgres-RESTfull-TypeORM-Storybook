import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilitiesService } from '@utils';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'form-reset-pass',
  templateUrl: './form-reset-pass.component.html',
  styleUrls: ['./form-reset-pass.component.scss'],
})
export class FormResetPassComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  protected formUtilities = inject(FormUtilitiesService);

  private passwordSubscription?: Subscription;
  private passwordSource = new BehaviorSubject<string | null>(null);
  formReset!: FormGroup;
  password$ = this.passwordSource.asObservable();

  ngOnInit(): void {
    this.formReset = this.formBuilder.group({
      password: [''],
      passRepeat: [''],
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

  onResetPassword(): void {
    if (!this.formReset.valid) return;

    // this.resetStateService.onResetPassword(this.formReset);
  }
}
