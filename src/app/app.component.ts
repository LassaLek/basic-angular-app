import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/service/authentication.service';
import { UsersService } from './users/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Example';
  currentUserLogged: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UsersService
  ) {
    this.userService.currentUserToken$.subscribe(x => this.currentUserLogged = !!x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
