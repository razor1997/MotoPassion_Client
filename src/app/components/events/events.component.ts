import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {EventService} from '../../services/events/event.service';
import {EventCardFormComponent} from '../event/event-card-form/event-card-form.component';

@Component({
  selector: 'app-events',
  imports: [
    NgIf,
    EventCardFormComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: Event[] = [];

  loading = true;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {

  }
}
