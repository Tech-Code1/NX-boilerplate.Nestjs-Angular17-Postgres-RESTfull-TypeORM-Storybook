import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

interface ExtendedFormControl extends FormControl {
  __initialized?: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class FormUtilitiesService {
  private validatorsCache: WeakMap<FormGroup, Map<string, ValidatorFn[]>> = new WeakMap();

  getValidators(formGroup: FormGroup, fieldName: string): ValidatorFn[] {
    // Retrieve the cached validators map for the given form group
    let formMap = this.validatorsCache.get(formGroup);

    // If no cache exists for this form group, create a new map and store it in the cache
    if (!formMap) {
      formMap = new Map<string, ValidatorFn[]>();
      this.validatorsCache.set(formGroup, formMap);
    }

    // If validators for the specified field are already cached, return them
    if (formMap.has(fieldName)) {
      return formMap.get(fieldName)!;
    }

    // Get the form control for the specified field name
    const fieldControl = formGroup.get(fieldName);
    let validators: ValidatorFn[] = [];

    // If the form control exists and has validators, add them to the validators array
    if (fieldControl && fieldControl.validator) {
      validators = [fieldControl.validator];
    }

    // Cache the validators array for future use to ensure reference stability
    formMap.set(fieldName, validators);

    // Return the validators array
    return validators;
  }

  getControl(formGroup: FormGroup, fieldName: string): FormControl {
    return formGroup.get(fieldName) as FormControl;
  }
}
