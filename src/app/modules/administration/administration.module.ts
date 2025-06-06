import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { ModuleNavigationComponent } from "../../shared/standalone/module-navigation/module-navigation.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SlyfoxUiAvatarComponent, SlyfoxUiButtonComponent, SlyfoxUiIconComponent, SlyfoxUiInputComponent } from 'slyfox-ui';
import { UsersTableComponent } from './users/users-table/users-table.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ModuleNavigationComponent,
    TranslateModule,
    SlyfoxUiButtonComponent,
    SlyfoxUiInputComponent,
    SlyfoxUiIconComponent,
    SlyfoxUiAvatarComponent,
    RouterModule
  ],
  exports: [],
  providers: [],
})
export class AdministrationModule {}
