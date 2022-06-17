import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinct, filter, flatMap, fromEvent, map, merge, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import * as _ from 'lodash';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {
  // Infinite scroll is variation of this - https://blog.strongbrew.io/infinite-scroll-with-rxjs-and-angular2/

  public breakpoint: number = 6;
  public itemHeight = 200;
  public loading = false;

  private numberOfItems = 6;
  private pageByManual$ = new BehaviorSubject(1);
  private scrollCache = [];
  private loadedList = [];

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
      filter(page => this.scrollCache[page - 1] === undefined)
    );

  itemResults$: Observable<User[]> = this.pageToLoad$
    .pipe(
      tap(_ => this.loading = true),
      flatMap((page: number) => {
        return this.usersService.getUsers(page)
          .pipe(
            tap(resp => {
              this.loading = false;
              this.scrollCache[page - 1] = <never>resp;
              if ((this.itemHeight * this.numberOfItems * page)
                < window.innerHeight) {
                this.pageByManual$.next(page + 1);
              }
            })
          )
      }),
      map(() => _.flatMap(this.scrollCache)),
      map((data) => {
        return data.filter((t) => {
          return !!t;
        });
      }),
      tap((data) => {
        this.loadedList = data;
      })
    );

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.breakpoint = Math.floor(window.innerWidth / 400);
  }

  onResize(event: any) {
    this.breakpoint = Math.floor(event.target.innerWidth / 400);
  }

}
