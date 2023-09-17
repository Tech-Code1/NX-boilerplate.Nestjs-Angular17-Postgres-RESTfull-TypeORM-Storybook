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
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1Control = formGroup.get(input1);
      const pass2Control = formGroup.get(input2);

      if (!pass1Control || !pass2Control) return null;

      const pass1 = pass1Control.value;
      const pass2 = pass2Control.value;

      if (pass1 !== pass2) {
        // * Add the noSimilar error without modifying other existing errors
        const existingErrors = pass2Control.errors || {};
        pass2Control.setErrors({ ...existingErrors, noSimilar: true });
        return { noSimilar: true };
      } else {
        // * If the password is similar, remove the noSimilar error but keep other errors
        if (pass2Control.errors && pass2Control.errors?.['noSimilar']) {
          delete pass2Control.errors?.['noSimilar'];
          if (!Object.keys(pass2Control.errors).length) {
            pass2Control.setErrors(null);
          }
        }
        return null;
      }
    };
  }
}
