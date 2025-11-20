import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserCreate} from '../model/user-create.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Login} from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }
  login(login: Login): Observable<any> {
    console.log("login", login);
    return this.https.post(`${environment.urlAddress}/auth/login`, login);
  }
  register(user: UserCreate): Observable<any> {
    console.log('Próba utworzenia użytkownika');
    return this.https.post(`${environment.urlAddress}/auth/register`, user);
  }
  logout()
  {

  }
  refreshToken(): Observable<any> {
    return this.https.post('/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken')
    });
  }
}
