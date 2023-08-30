import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'form-recover',
  templateUrl: './form-recover.component.html',
  styleUrls: ['./form-recover.component.scss'],
})
export class FormRecoverComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  formRegister!: FormGroup;

  get emailControl(): FormControl {
    return this.formRegister.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
}
