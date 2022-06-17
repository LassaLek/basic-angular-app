import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { take } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | null =  null;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private location: Location) { }

  ngOnInit(): void {
   let id = this.route.snapshot.paramMap.get('id');
   let numbered = !!id ? +id : 0
   this.usersService.getUser(numbered)
     .pipe(take(1))
     .subscribe((user) => {
       this.user = user;
     })
  }


  goBack() {
    this.location.back();
  }

}
