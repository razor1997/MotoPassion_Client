import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CommunityPost} from '../../model/community-post';

@Injectable({
  providedIn: 'root'
})
export class InspirationWallService {
  getPosts(): Observable<CommunityPost[]> {
    // MOCK
    return of([
      {
        id: '1',
        userName: 'MotoRider',
        userAvatar: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg',
        createdAt: '2025-02-10T12:00:00Z',
        imageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg',
        description: 'Świetny spot pod Warszawą!',
        location: { name: 'Warszawa', lat: 52.23, lng: 21.01 },
      },
      {
        id: '2',
        userName: 'Night Wolf',
        userAvatar: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1763311653/avatars/dtnzukab9x0bfmd2fldi.png',
        createdAt: '2025-02-12T20:30:00Z',
        imageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1763311653/avatars/dtnzukab9x0bfmd2fldi.png',
        description: 'Nocna trasa — polecam! 🔥',
        location: { name: 'Warszawa', lat: 52.23, lng: 21.01 },
      }
    ]);
  }
}
