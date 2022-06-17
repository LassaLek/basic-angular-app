import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, debounceTime, distinct, filter, flatMap, fromEvent, map, merge, Observable, tap } from 'rxjs';
import * as _ from 'lodash'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  // Infinite scroll is variation of this - https://blog.strongbrew.io/infinite-scroll-with-rxjs-and-angular2/
  private pageByManual$ = new BehaviorSubject(1);
  public itemHeight = 200;
  private numberOfItems = 6;
  breakpoint: number = 6;
  private cache = [];
  private loadedList = [];

  ngOnInit() {
    this.breakpoint = Math.floor(window.innerWidth / 400);
  }

  onResize(event: any) {
    this.breakpoint = Math.floor(event.target.innerWidth / 400);
  }


  showDetail(id: number) {

  }

  private pageByScroll$ = fromEvent(window, "scroll")
    .pipe(
      map(() => window.scrollY),
      filter(current =>
        current >= document.body.clientHeight - window.innerHeight),
      debounceTime(200),
      distinct(),
      map(y => Math.ceil(
          (y + window.innerHeight) / (this.itemHeight * this.numberOfItems)
        )
      )
    );

  private pageByResize$ = fromEvent(window, "resize")
    .pipe(
      debounceTime(200),
      map(_ => Math.ceil(
        (window.innerHeight + document.body.scrollTop) /
        (this.itemHeight * this.numberOfItems)
      ))
    )

  private pageToLoad$ = merge(
    this.pageByManual$,
    this.pageByScroll$,
    this.pageByResize$)
    .pipe(
      distinct(),
      filter(page => this.cache[page - 1] === undefined)
    );

  loading = false;

  itemResults$: Observable<User[]> = this.pageToLoad$
    .pipe(
      tap(_ => this.loading = true),
      flatMap((page: number) => {
        return this.usersService.getUsers(page)
          .pipe(
            tap(resp => {
              this.loading = false;
              this.cache[page - 1] = <never>resp;
              if ((this.itemHeight * this.numberOfItems * page)
                < window.innerHeight) {
                this.pageByManual$.next(page + 1);
              }
            })
          )
      }),
      map(() => _.flatMap(this.cache)),
      map((data) => {
        return data.filter((t) => {
          return !!t;
        });
      }),
      tap((data) => {
        this.loadedList = data;
        console.log('Loaded list:', this.loadedList);
      })
    );

  constructor(private usersService: UsersService) {
  }
}
