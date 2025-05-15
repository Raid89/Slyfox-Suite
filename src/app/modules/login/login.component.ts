import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);

  protected loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  })

  protected loginFormErrorsMessages = {
    username: {
      required: 'El nombre de usuario es requerido',
      minlength: 'El nombre de usuario debe tener al menos 3 caracteres',
      maxlength: 'El nombre de usuario debe tener como máximo 50 caracteres',
    },
    password: {
      required: 'La contraseña es requerida',
      maxlength: 'La contraseña debe tener como máximo 20 caracteres',
      minlength: '',
    }
  }

  protected passwordVisible = false;

  constructor() { }

  getFieldError(field: keyof typeof this.loginFormErrorsMessages): string {
    const control = this.loginForm.get(field);

    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;

    if (errors['required']) return this.loginFormErrorsMessages[field].required;
    if (errors['minlength']) return this.loginFormErrorsMessages[field].minlength;
    if (errors['maxlength']) return this.loginFormErrorsMessages[field].maxlength;

    return '';
  }

  protected togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
