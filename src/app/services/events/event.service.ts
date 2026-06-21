import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {EventDto} from '../../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private https: HttpClient) { }
  createEvent(data: FormData) {
    return this.https.post(`${environment.urlAddress}/events`, data);
  }
  getAllEvents() : Observable<EventDto[]> {
    return this.https.get<EventDto[]>(`${environment.urlAddress}/events`);

  }
  getAllEventsFiltered(from?: Date, to?: Date): Observable<Event[]> {
    let url = `${environment.urlAddress}/events/filtered?`;

    if (from) url += `from=${encodeURIComponent(from.toISOString().slice(0, 10))}`;
    if (to) url += `&to=${encodeURIComponent(to.toISOString().slice(0, 10))}`;
    console.log("GetAll" + url);
    return this.https.get<Event[]>(url);
  }
}
