import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SlyfoxUiButtonComponent, SlyfoxUiIconComponent, SlyfoxUiInputComponent } from 'slyfox-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaCardBannerComponent } from '../../standalone/media-card-banner/media-card-banner.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SlyfoxUiInputComponent,
    SlyfoxUiButtonComponent,
    SlyfoxUiIconComponent,
    MediaCardBannerComponent,
    NgOptimizedImage,
    RouterModule
  ]
})
export class LoginModule { }
