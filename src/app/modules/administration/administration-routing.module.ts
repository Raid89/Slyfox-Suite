import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministrationComponent } from './administration.component';
import { LayoutComponent } from '@standalone/layout/layout.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
