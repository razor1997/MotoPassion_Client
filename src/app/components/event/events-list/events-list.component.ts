import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDto, EventRow } from '../../../model/event';
import {EventFilterComponent} from '../event-filter/event-filter.component';
import {mapEventToRow} from '../../../mapper/event.mapper';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {EventService} from '../../../services/events/event.service';
import {Observable} from 'rxjs';
import {toDate, today, toDateDescriptionParam} from '../../../utils/date-utils';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventFilterComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  @Input() eventsAutomotive: EventDto[] = [];
  filteredEvents: EventRow[] = [];

  constructor(private http: HttpClient, private router: Router, private eventService: EventService) {}
  onFilterRefreshClick(): void {
    this.applyFilters();
  }
  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEvents = this.eventsAutomotive
      .map(mapEventToRow)
      .filter(e => {
        const d = toDate(e.date);
        const from = this.filterFrom ? toDate(this.filterFrom) : null;
        const to = this.filterTo ? toDate(this.filterTo) : null;

        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get events(): EventRow[] {
    return this.eventsAutomotive
      .map(mapEventToRow)
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
    console.log('Open event details', id);
  }

  join(id: string): void {
    console.log('Join event', id);
  }

  more(id: string): void {
    console.log('Open event details', id);
  }

  skip(id: string): void {
    console.log('Skip event', id);
  }

  protected readonly toDate = toDate;
  protected readonly toDateDescriptionParam = toDateDescriptionParam;
}
