import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './_shared/shared.module';
import { TokenInterceptor } from './_shared/services/token.interceptor';
import { ErrorInterceptor } from './_shared/services/error.interceptor';
import { UsersModule } from './users/users.module';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';
import { InfiniteScrollComponent } from './users/containers/infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    // Http communication entry
    HttpClientModule,
    // Feature modules
    // Authentication
    AuthModule,
    UsersModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
