import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchEmailValidator(emailField: string, confirmEmailField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const email = group.get(emailField)?.value;
    const confirmEmail = group.get(confirmEmailField)?.value;

    if (email !== confirmEmail) {
      group.get(confirmEmailField)?.setErrors({ emailMismatch: true });
      return { emailMismatch: true };
    } else {
      // Limpia el error si coincide
      const errors = group.get(confirmEmailField)?.errors;
      if (errors) {
        delete errors['emailMismatch'];
        if (Object.keys(errors).length === 0) {
          group.get(confirmEmailField)?.setErrors(null);
        } else {
          group.get(confirmEmailField)?.setErrors(errors);
        }
      }
      return null;
    }
  };
}
