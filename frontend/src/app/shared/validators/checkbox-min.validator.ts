/**
 * Validator for minimum checkbox selections.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator to ensure minimum number of checkboxes are selected
 */
export function minCheckboxValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || !Array.isArray(value)) {
      return { minCheckbox: `At least ${min} options must be selected` };
    }

    const selectedCount = value.length;

    if (selectedCount < min) {
      return { minCheckbox: `At least ${min} options must be selected` };
    }

    return null;
  };
}
