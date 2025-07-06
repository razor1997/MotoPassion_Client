import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserCreate} from '../model/user-create.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private https: HttpClient) { }

  register(user: UserCreate): Observable<any> {
    console.log('Próba utworzenia użytkownika');
    return this.https.post(`${environment.urlAddress}/register`, user);
  }
}
