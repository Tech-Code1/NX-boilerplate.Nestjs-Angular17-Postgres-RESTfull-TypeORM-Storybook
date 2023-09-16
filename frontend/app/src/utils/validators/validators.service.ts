import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  /* similarInputs(
    input1: string,
    input2: string
  ): (formGroup: AbstractControl) => ValidationErrors | null {
    console.log('Validador similarInputs llamado con', input1, input2);

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = input1;
      const pass2 = formGroup.get(input2)?.value;

      if (pass1 === pass2) {
        if (formGroup.get(input2)?.hasError('noSimilar')) {
          delete formGroup.get(input2)?.errors?.['noSimilar'];
          formGroup.get(input2)?.updateValueAndValidity();
        }
        return null;
      }

      formGroup.get(input2)?.setErrors({ noSimilar: true });
      return { noSimilar: true };
    };
  } */

  similarInputs(input1: string, input2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      console.log('Inside similarInputs validator function');

      const pass1 = formGroup.get(input1)?.value;
      const pass2 = formGroup.get(input2)?.value;

      console.log('pass1:', pass1, 'pass2:', pass2);

      if (pass1 && pass2 && pass1 === pass2) {
        console.log('Returning noSimilar error');
        return { noSimilar: true };
      }
      return null;
    };
  }
}
