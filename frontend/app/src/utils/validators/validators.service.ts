import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  similarInputs(
    input1: string,
    input2: string
  ): (formGroup: AbstractControl) => ValidationErrors | null {
    console.log(input1, input2);

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
  }
}
