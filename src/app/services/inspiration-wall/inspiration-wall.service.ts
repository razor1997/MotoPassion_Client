import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CommunityPost } from '../../model/community-post';
import { environment } from '../../environments/environment';

interface PostApiDto {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl: string;
  description: string;
  photoUrl: string;
  longitude: number;
  latitude: number;
  createdAt: string;
  participants?: {
    userId: string;
    userName: string;
    avatarUrl: string;
    createdAt: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class InspirationWallService {
  constructor(private http: HttpClient) {}

  private mapPost(post: PostApiDto): CommunityPost {
    return {
      id: post.id,
      userId: post.userId,
      userName: post.userName,
      userAvatarUrl: post.userAvatarUrl,
      createdAt: post.createdAt,
      photoUrl: post.photoUrl,
      description: post.description,
      participants: post.participants?.map(p => ({
        userId: p.userId,
        userName: p.userName,
        avatarUrl: p.avatarUrl,
        createdAt: p.createdAt
      })) ?? [],
      location: {
        name: 'Punkt wyprawy',
        lat: post.latitude,
        lng: post.longitude
      }
    };
  }

  getPosts(): Observable<CommunityPost[]> {
    return this.http.get<PostApiDto[]>(`${environment.urlAddress}/posts`).pipe(
      map(posts => posts.map(post => this.mapPost(post)))
    );
  }

  getPostById(id: string): Observable<CommunityPost> {
    return this.http.get<PostApiDto>(`${environment.urlAddress}/posts/${id}`).pipe(
      map(post => this.mapPost(post))
    );
  }

  getPostsUser(userId: string): Observable<CommunityPost[]> {
    return this.http.get<PostApiDto[]>(`${environment.urlAddress}/posts/user/${userId}`).pipe(
      map(posts => posts.map(post => this.mapPost(post)))
    );
  }

  post(data: FormData): Observable<any> {
    return this.http.post(`${environment.urlAddress}/posts`, data);
  }
}
