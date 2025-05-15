import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MediaCardBannerComponent } from '../../standalone/media-card-banner/media-card-banner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SlyfoxUiButtonComponent, SlyfoxUiIconComponent, SlyfoxUiInputComponent } from 'slyfox-ui';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MediaCardBannerComponent,
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage,
    SlyfoxUiButtonComponent,
    SlyfoxUiIconComponent,
    SlyfoxUiInputComponent
  ]
})
export class RegisterModule { }
