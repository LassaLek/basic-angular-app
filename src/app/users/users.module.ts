import { NgModule } from '@angular/core';
import { UsersPageComponent } from './containers/users-page/users-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class UsersModule { }
