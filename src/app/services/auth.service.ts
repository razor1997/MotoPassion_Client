import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserCreate} from '../model/user-create.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: UserCreate): Observable<any> {
    return this.http.post(`${environment.urlAddress}/register`, user);
  }
}
