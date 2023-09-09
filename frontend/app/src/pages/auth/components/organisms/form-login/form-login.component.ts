import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtilitiesService } from '../../../../../utils';
import { LoginStateService } from '../../../service/state';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginStateService);
  protected formUtilities = inject(FormUtilitiesService);

  formRegister!: FormGroup;

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.maxLength(10)]],
      password: [''],
    });
  }

  onSubmit() {
    if (!this.formRegister.valid) return;

    this.loginService.onSubmit(this.formRegister);
  }
}
