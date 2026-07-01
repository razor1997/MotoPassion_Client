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
  getAllEvents(currentUserId?: string): Observable<EventDto[]> {
    let url = `${environment.urlAddress}/events`;
    if (currentUserId) {
      url += `?currentUserId=${encodeURIComponent(currentUserId)}`;
    }
    return this.https.get<EventDto[]>(url);
  }

  getAllEventsFiltered(from?: Date, to?: Date, currentUserId?: string): Observable<EventDto[]> {
    let url = `${environment.urlAddress}/events/filtered?`;

    if (from) url += `from=${encodeURIComponent(from.toISOString().slice(0, 10))}`;
    if (to) url += `&to=${encodeURIComponent(to.toISOString().slice(0, 10))}`;
    if (currentUserId) url += `&currentUserId=${encodeURIComponent(currentUserId)}`;

    return this.https.get<EventDto[]>(url);
  }

  getEventById(id: string, currentUserId?: string): Observable<EventDto> {
    let url = `${environment.urlAddress}/events/${id}`;
    if (currentUserId) {
      url += `?currentUserId=${encodeURIComponent(currentUserId)}`;
    }
    return this.https.get<EventDto>(url);
  }

  joinEvent(id: string, currentUserId: string): Observable<EventDto> {
    return this.https.post<EventDto>(
      `${environment.urlAddress}/events/${id}/join?currentUserId=${encodeURIComponent(currentUserId)}`,
      {}
    );
  }
  leaveEvent(id: string, currentUserId: string): Observable<EventDto> {
    return this.https.post<EventDto>(
      `${environment.urlAddress}/events/${id}/leave?currentUserId=${encodeURIComponent(currentUserId)}`,
      {}
    );
  }
}
