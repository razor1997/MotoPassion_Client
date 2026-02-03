import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private https: HttpClient) { }
  createEvent(data: FormData) {
    return this.https.post(`${environment.urlAddress}/events`, data);
  }
}
