import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {CommunityUser} from '../../model/community-user';


@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private https: HttpClient) {}

  getUsers(): Observable<CommunityUser[]> {
    console.log('pobieranie innych użytkowników' + `${environment.urlAddress}/users`);
    return this.https.get<CommunityUser[]>(`${environment.urlAddress}/users`);
  }
}
