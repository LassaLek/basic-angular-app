import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<any>(environment.baseApiUrl + `login?delay=3`, {email, password})
  }
}
