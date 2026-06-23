import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/events/event.service';
import { EventDto } from '../../../model/event';
import { toDateDisplay } from '../../../utils/date-utils';
import { toVisibilityLabel, toEventTypeLabel,toEventCategoryName } from '../../../utils/event-utils';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  event: EventDto | null = null;
  loading = true;
  error = '';
  eventId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Brak identyfikatora wydarzenia.';
      this.loading = false;
      return;
    }

    this.eventId = id;
    this.loadEvent();
  }

  loadEvent(): void {
    this.loading = true;
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać wydarzenia.';
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/event/events-list']);
  }

  join(): void {
    console.log('Join event', this.eventId);
  }

  protected readonly toDateDisplay = toDateDisplay;
  protected readonly toVisibilityLabel = toVisibilityLabel;
  protected readonly toEventTypeLabel = toEventTypeLabel;
  protected readonly toEventCategoryName = toEventCategoryName;
}
