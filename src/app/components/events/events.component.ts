import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventService} from '../../services/events/event.service';
import {EventsListComponent} from '../event/events-list/events-list.component';
import {EventDto} from '../../model/event';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    EventsListComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  eventsAutomotive: EventDto[] = [];

  loading = true;
  constructor(private eventService: EventService) {

  }

  ngOnInit(): void {
    this.loadEvents();
    console.log("Events Component loaded");
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.eventsAutomotive = events;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
