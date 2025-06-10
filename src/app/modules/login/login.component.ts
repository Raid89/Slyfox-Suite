import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AssetsService } from '@services/assets.service';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationDialogComponent } from '@standalone/dialogs/information-dialog/information-dialog.component';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private assetsService = inject(AssetsService);
  private dialog = inject(Dialog);
  private authService = inject(AuthService);

  protected readonly logoUrl = this.assetsService.getLogo('isotipo-slyfox');

  protected loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  protected passwordVisible = false;

  ngOnInit(): void {
    const statusValidation = JSON.parse(this.activatedRouter.snapshot.queryParamMap.get('statusValidation') || '{}');
    if (statusValidation.success !== undefined) {
      this.showValidationEmailDialog(statusValidation.success);
      this.deleteQueryParams();
    }
  }

  getFieldError(field: 'username' | 'password'): string {
    const control = this.loginForm.get(field);

    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    const fieldUpperCase = field.toUpperCase();

    if (errors['required']) return this.translate.instant(`LOGIN.${fieldUpperCase}.ERRORS.REQUIRED`);
    if (errors['minlength']) return this.translate.instant(`LOGIN.${fieldUpperCase}.ERRORS.MIN_LENGTH`);
    if (errors['maxlength']) return this.translate.instant(`LOGIN.${fieldUpperCase}.ERRORS.MAX_LENGTH`);

    return '';
  }

  showValidationEmailDialog(success: boolean) {
    if(success) {
      this.dialog.open(InformationDialogComponent, {
        data: {
          message: this.translate.instant('LOGIN.VALIDATE_EMAIL.SUCCESS.MESSAGE'),
          buttonText: this.translate.instant('LOGIN.VALIDATE_EMAIL.SUCCESS.BUTTON_TEXT'),
          iconName: 'check',
          iconCategory: 'general',
        }
      });
    } else {
      this.dialog.open(InformationDialogComponent, {
        data: {
          message: this.translate.instant('LOGIN.VALIDATE_EMAIL.ERROR.MESSAGE'),
          buttonText: this.translate.instant('LOGIN.VALIDATE_EMAIL.ERROR.BUTTON_TEXT'),
          type: 'error',
          iconName: 'x-circle',
          iconCategory: 'general',
        }
      });
    }
  }

  deleteQueryParams() {
    this.router.navigate([], {
      queryParams: {
        statusValidation: null
      },
      queryParamsHandling: 'merge'
    });
  }

  protected togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  protected login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.authenticateUser(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: this.translate.instant('LOGIN.ERROR.AUTHENTICATION'),
            buttonText: this.translate.instant('GENERAL.CLOSE'),
            type: 'error',
            iconName: 'x-circle',
            iconCategory: 'general',
          }
        });
      }
    });
  }
}
