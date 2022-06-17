import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/containers/login-page/login-page.component';
import { UsersPageComponent } from './users/containers/users-page/users-page.component';
import { AuthenticationGuard } from './auth/service/authentication.guard';
import { UserDetailComponent } from './users/containers/user-detail/user-detail.component';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginPageComponent },
  // Wild Card for 404 request
  { path: '**', pathMatch: 'full',
    component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
