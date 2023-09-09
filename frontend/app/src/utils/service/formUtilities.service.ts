import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilitiesService {
  getValidators(formGroup: FormGroup, fieldName: string): ValidatorFn[] {
    const fieldControl = formGroup.get(fieldName);
    if (fieldControl && fieldControl.validator) {
      return [fieldControl.validator];
    }
    return [];
  }

  getControl(formGroup: FormGroup, fieldName: string): FormControl {
    return formGroup.get(fieldName) as FormControl;
  }
}
