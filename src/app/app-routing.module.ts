import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./page/register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./page/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },  {
    path: 'lista-boletos-user',
    loadChildren: () => import('./page/lista-boletos-user/lista-boletos-user.module').then( m => m.ListaBoletosUserPageModule)
  },
  {
    path: 'boletos-user',
    loadChildren: () => import('./page/boletos-user/boletos-user.module').then( m => m.BoletosUserPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
