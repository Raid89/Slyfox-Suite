import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField)?.value;
    const confirmPassword = group.get(confirmPasswordField)?.value;

    if (password !== confirmPassword) {
      group.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Limpia el error si coincide
      const errors = group.get(confirmPasswordField)?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          group.get(confirmPasswordField)?.setErrors(null);
        } else {
          group.get(confirmPasswordField)?.setErrors(errors);
        }
      }
      return null;
    }
  };
}
