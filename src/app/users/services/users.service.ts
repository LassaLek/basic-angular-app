import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UsersApiService } from './users.api.service';

export enum UserDataEnum {
  TOKEN = 'TOKEN'
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public currentUserTokenSubject: BehaviorSubject<string | null>;
  public currentUserToken$: Observable<string | null>;
  public dataCache: Map<number, User[]> = new Map();


  constructor(private usersApi: UsersApiService) {
    this.currentUserTokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
    this.currentUserToken$ = this.currentUserTokenSubject.asObservable();
  }


  public get currentUserTokenValue(): string | null {
    return this.currentUserTokenSubject.value;
  }

  getUser(id: number): Observable<User> {
    return this.usersApi.getUser(id)
      .pipe( map((resp: any) => {
      return resp.data
    }));
  }

  getUsers(page: number): Observable<User[]> {
    const fromCache = this.dataCache.get(page);
    if(fromCache) {
      return of(fromCache);
    }
    return this.usersApi.getUsers(page)
      .pipe( map((resp: any) => {
      return resp.data
    }),tap((data) => {
        this.dataCache.set(page, data);
      }))
  }

  private getStoredToken(): string | null {
    let storedToken = localStorage.getItem(UserDataEnum.TOKEN);
    if(storedToken) {
      return JSON.parse(storedToken)
    }

    return null;
  }
}
