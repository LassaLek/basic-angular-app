import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/services/users.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private usersService: UsersService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.usersService.currentUserTokenValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-access-token': `${token}`
        }
      });
    }

    return next.handle(request);
  }
}
