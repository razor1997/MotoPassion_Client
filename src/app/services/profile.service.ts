import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileEdit} from '../model/profile-edit';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private https: HttpClient) {

  }
  edit(user: FormData): Observable<any> {
    return this.https.put(`${environment.urlAddress}/users/`+localStorage.getItem('userId'), user);
  }
}
