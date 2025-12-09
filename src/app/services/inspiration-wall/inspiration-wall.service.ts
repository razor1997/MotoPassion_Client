import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CommunityPost} from '../../model/community-post';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CommunityUser} from '../../model/community-user';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspirationWallService {
  constructor(private https: HttpClient) {

  }
  getPosts(): Observable<CommunityPost[]> {
    console.log('pobieranie innych użytkowników' + `${environment.urlAddress}/users`);
    return this.https.get<CommunityPost[]>(`${environment.urlAddress}/posts`);
  }

  getPostsUser(userId: string): Observable<CommunityPost[]> {
    console.log("test postów użytkownika"+userId)
    const params = new HttpParams().set('userId', userId);

    return this.https.get<CommunityPost[]>(`${environment.urlAddress}/posts/user/`+userId);
  }

  post(data: FormData): Observable<any> {
    return this.https.post(`${environment.urlAddress}/posts`, data);
  }
}
