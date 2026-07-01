import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/events/event.service';
import { EventDto } from '../../../model/event';
import { toDateDisplay } from '../../../utils/date-utils';
import { toVisibilityLabel, toEventTypeLabel,toEventCategoryName } from '../../../utils/event-utils';
import {CommunityService} from '../../../services/community/community.service';
import {map, of, switchMap} from 'rxjs';
import {CommunityUser} from '../../../model/community-user';
import {UserSessionService} from '../../../services/user-service.service';

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
  participants: CommunityUser[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private communityService: CommunityService,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Brak identyfikatora wydarzenia.';
      this.loading = false;
      return;
    }

    this.eventId = id;
    this.loadEventWithParticipants();
  }

  private loadParticipantsForEvent(event: EventDto) {
    if (!event.participantIds || event.participantIds.length === 0) {
      return of([] as CommunityUser[]);
    }

    return this.communityService.getUsers().pipe(
      map((users) => users.filter(user => event.participantIds.includes(user.id)))
    );
  }

  loadEventWithParticipants(): void {
    this.loading = true;
    const currentUserId = this.session.userId;

    this.eventService.getEventById(this.eventId, currentUserId ?? undefined).pipe(
      switchMap((event) => {
        this.event = event;
        return this.loadParticipantsForEvent(event);
      })
    ).subscribe({
      next: (participants) => {
        this.participants = participants ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać wydarzenia.';
        this.loading = false;
      }
    });
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
    const currentUserId = this.session.userId;
    if (!currentUserId || !this.event) return;

    this.loading = true;

    this.eventService.joinEvent(this.eventId, currentUserId).pipe(
      switchMap((event) => {
        this.event = event;
        return this.loadParticipantsForEvent(event);
      })
    ).subscribe({
      next: (participants) => {
        this.participants = participants ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'Nie udało się dołączyć do wydarzenia.';
        this.loading = false;
      }
    });
  }
  leave(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId || !this.event) return;

    this.loading = true;

    this.eventService.leaveEvent(this.eventId, currentUserId).pipe(
      switchMap((event) => {
        this.event = event;
        return this.loadParticipantsForEvent(event);
      })
    ).subscribe({
      next: (participants) => {
        this.participants = participants ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error ?? 'Nie udało się opuścić wydarzenia.';
        this.loading = false;
      }
    });
  }
  protected readonly toDateDisplay = toDateDisplay;
  protected readonly toVisibilityLabel = toVisibilityLabel;
  protected readonly toEventTypeLabel = toEventTypeLabel;
  protected readonly toEventCategoryName = toEventCategoryName;
}
