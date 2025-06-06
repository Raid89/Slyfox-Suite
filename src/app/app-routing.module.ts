import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@standalone/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    data: { animation: 'LoginPage' }
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
    data: { animation: 'RegisterPage' }
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'administration',
        loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
