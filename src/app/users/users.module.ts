import { NgModule } from '@angular/core';
import { UsersPageComponent } from './containers/users-page/users-page.component';
import { SharedModule } from '../_shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { InfiniteScrollComponent } from './containers/infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserDetailComponent,
    InfiniteScrollComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})
export class UsersModule { }
