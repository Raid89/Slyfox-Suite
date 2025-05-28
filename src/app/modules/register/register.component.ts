import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordValidator } from '@validators/match-password.validator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssetsService } from '@services/assets.service';
import { CompaniesService } from '@services/companies.service';
import { ICreateCompanySuccess, ICreateCompanyWithUser } from '@interfaces/companies.interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { InformationDialogComponent } from '@standalone/dialogs/information-dialog/information-dialog.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private dialog = inject(Dialog);
  private translate = inject(TranslateService);
  private assetsService = inject(AssetsService);
  private readonly companiesService = inject(CompaniesService);

  protected registerForm = this.initRegisterForm();
  protected isLoading = signal(false);

  protected readonly logoUrl = this.assetsService.getLogo('imagotipo-slyfox');

  // Functions to register form controls

  initRegisterForm() {
    return this.formBuilder.group({
      company: this.formBuilder.group({
        name: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]],
        subscription_plan: ['Basic'],
        nit: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15)
        ]],
        address: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]],
        phone: ['', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10)
        ]],
        email: ['', [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]],
      }),

      user: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]],
        confirm_password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20)
        ]],
        email: ['', [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]],
        username: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]],
      }, {
        validators: [matchPasswordValidator('password', 'confirm_password')]
      })
    });
  }

  getFieldError(path: string): string {
    const control = this.registerForm.get(path);

    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    const translatePath = path.includes('user')
      ? `REGISTER.USER.${path.split('.')[1].toUpperCase()}`
      : `REGISTER.COMPANY.${path.split('.')[1].toUpperCase()}`;

    if (errors['required']) return this.translate.instant(`${translatePath}.ERRORS.REQUIRED`);
    if (errors['minlength']) return this.translate.instant(`${translatePath}.ERRORS.MIN_LENGTH`);
    if (errors['maxlength']) return this.translate.instant(`${translatePath}.ERRORS.MAX_LENGTH`);
    if (errors['email']) return this.translate.instant(`${translatePath}.ERRORS.EMAIL`);
    if (errors['matchPassword']) return this.translate.instant('REGISTER.USER.CONFIRM_PASSWORD.ERRORS.MATCH');

    return '';
  }

  // Functions to handle form submission

  handlerSubmit() {
    if (this.registerForm.status === 'INVALID') {
      this.registerForm.markAllAsTouched();
    } else {
      this.isLoading.set(true);
      this.sendRegisterData()
    }
  }

  sendRegisterData() {
    const registerData = this.registerForm.value as ICreateCompanyWithUser;
    this.companiesService.createCompanyWithUser(registerData).subscribe(this.observerDataRegister());
  }

  observerDataRegister() {
    return {
      next: (response: ICreateCompanySuccess) => {
        const dialog = this.dialog.open(InformationDialogComponent, {
          data: {
            message: this.translate.instant('REGISTER.DIALOGS.COMPANY_CREATED', { email: this.registerForm.value.company?.email }),
            type: 'success',
            iconName: 'mail-02',
            iconCategory: 'communication',
          }
        });
        this.isLoading.set(false);
        dialog.closed.subscribe(() => this.router.navigate(['/login']));
      },
      error: (error: any) => {
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: this.translate.instant('REGISTER.DIALOGS.GENERAL_ERROR'),
            type: 'error',
            iconName: 'x-circle',
            iconCategory: 'general',
          }
        })
        this.isLoading.set(false);
      }
    };
  }

  // Other functions
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
