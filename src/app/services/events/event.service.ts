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
  getAllEventsFiltered(from?: string, to?: string): Observable<Event[]> {
    console.log("GetAll");
    let url = `${environment.urlAddress}/events?`;
    if (from) url += `from=${from}`;
    if (to) url += `&to=${to}`;
    return this.https.get<Event[]>(url);
  }
}
