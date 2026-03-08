import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventDto, EventRow} from '../../../model/event';
import {EventService} from '../../../services/events/event.service';
import {EventFilterComponent} from '../event-filter/event-filter.component';
import {toDate} from '../../../utils/date-utils';
import {mapEventToRow} from '../../../mapper/event.mapper';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventFilterComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  eventsAutomotive: EventDto[]=[];
  events: EventRow[] = [
    {
      id: '1',
      name: 'Zlot klasyków – Wrocław',
      date: '2026-03-15',
      location: 'Wrocław, Rynek',
      description: 'Spotkanie miłośników klasycznych aut.',
      participantsCount: 18,
      maxCountParticipants: 50
    },
    {
      id: '2',
      name: 'Wycieczka w góry – Sudety',
      date: '2026-04-02',
      location: 'Karpacz',
      description: 'Trasa krajoznawcza, tempo turystyczne.',
      participantsCount: 8,
      maxCountParticipants: 20
    }
  ];

  constructor(private router: Router,
              private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEventsAutomotive();
  }

  loadEventsAutomotive(): void {
    this.eventService.getAllEvents().subscribe({
      next: (eventsAutomotive) => {
        this.eventsAutomotive = eventsAutomotive;
      }
    });
  }
  onFilterRefreshClick(): void {
    this.loadEventsAutomotive();
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data.map(mapEventToRow);
      }
    });
    this.filterEvents();
  }


  filterEvents(): void  {
    this.events
      .filter(e => {
        const d = toDate(e.date);
        const from = this.filterFrom ? toDate(this.filterFrom) : null;
        const to = this.filterTo ? toDate(this.filterTo) : null;
        if (from && d < from) return false;
        return !(to && d > to);

      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  filterFrom: string = '';
  filterTo: string = '';

  openDetails(id: string): void {
    this.router.navigate(['/events', id]);
  }

  join(id: string): void {
    console.log('Join event', id);
  }

  more(id: string): void {
    this.router.navigate(['/events', id]);
  }

  skip(id: string): void {
    console.log('Skip event', id);
  }
}
