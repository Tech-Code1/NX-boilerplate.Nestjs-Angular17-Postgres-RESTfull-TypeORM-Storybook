import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilitiesService } from '@utils';

@Component({
  selector: 'form-recover',
  templateUrl: './form-recover.component.html',
  styleUrls: ['./form-recover.component.scss'],
})
export class FormRecoverComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected formUtilities = inject(FormUtilitiesService);

  formRecover!: FormGroup;

  ngOnInit(): void {
    this.formRecover = this.formBuilder.group({
      email: [''],
    });
  }

  onRecoverPassword() {
    if (!this.formRecover.valid) return;

    //this.registerService.onRegister(this.formRegister);
  }
}
