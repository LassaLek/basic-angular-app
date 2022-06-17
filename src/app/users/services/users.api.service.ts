import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(environment.baseApiUrl + `users/${id}`)
  }

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(environment.baseApiUrl + `users?delay=3&page=${page}`)
  }
}
