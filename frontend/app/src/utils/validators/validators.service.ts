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
        pass2Control.setErrors({ noSimilar: true });
        return { noSimilar: true };
      } else {
        pass2Control.setErrors(null);
        return null;
      }
    };
  }
}
