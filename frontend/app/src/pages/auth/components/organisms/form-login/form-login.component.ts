import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent, InputComponent, LabelComponent, TitleComponent } from '@ui/components';
import { FormUtilitiesService } from '@utils';
import { LoginStateService } from '../../../service/state';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TitleComponent,
    InputComponent,
    LabelComponent,
    ButtonComponent,
  ],
})
export class FormLoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginStateService);
  protected formUtilities = inject(FormUtilitiesService);

  formLogin!: FormGroup;

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) return;

    this.loginService.onSubmit(this.formLogin);
  }
}
