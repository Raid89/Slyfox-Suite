import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../shared/validators/match-password.validator';
import { matchEmailValidator } from '../../shared/validators/match-email.validators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);

  protected registerForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    nit: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]),
    user: this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
    }, {
      validators: [matchPasswordValidator('password', 'confirm_password')]
    })
  });

  getFieldError(path: string): string {
    const control = path.includes('.')
      ? this.registerForm.get(path)
      : this.registerForm.get(path);

    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return 'Este campo es requerido';
    if (errors['minlength']) return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Este campo debe tener como máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['email']) return 'El correo electrónico no es válido';
    if (errors['passwordMismatch']) return 'Las contraseñas no coinciden';

    return '';
  }

  handlerSubmit() {
    if (this.registerForm.status === 'INVALID') {
      debugger
      this.registerForm.markAllAsTouched();
    }
    debugger
  }

}
