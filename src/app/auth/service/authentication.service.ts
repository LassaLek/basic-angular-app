import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthApiService } from './auth.api.service';
import { UserDataEnum, UsersService } from '../../users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private authApi: AuthApiService, private usersService: UsersService) {
  }

  login(email: string, password: string) {
    return this.authApi.login(email, password)
      .pipe(
        map(res => {
          if (res && res.token) {
            localStorage.setItem(UserDataEnum.TOKEN, JSON.stringify(res.token));
          }
          return res;
        }));
  }

  logout() {
    localStorage.removeItem(UserDataEnum.TOKEN);
    this.usersService.currentUserTokenSubject.next(null);
  }
}
