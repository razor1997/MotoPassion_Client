import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/events/event.service';
import { EventsListComponent } from '../event/events-list/events-list.component';
import { EventDto } from '../../model/event';
import { UserSessionService } from '../../services/user-service.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventsListComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  eventsAutomotive: EventDto[] = [];
  loading = true;

  constructor(
    private eventService: EventService,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents(this.session.userId ?? undefined).subscribe({
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
