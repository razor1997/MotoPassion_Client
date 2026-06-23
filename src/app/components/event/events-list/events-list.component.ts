import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDto, EventRow } from '../../../model/event';
import {EventFilterComponent} from '../event-filter/event-filter.component';
import {mapEventToRow} from '../../../mapper/event.mapper';
import {toDate, toDateDisplay} from '../../../utils/date-utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventFilterComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent {
  @Input() _eventsAutomotive: EventDto[] = [];
  filteredEvents: EventRow[] = [];

  @Input() set eventsAutomotive(value: EventDto[]) {
    this._eventsAutomotive = value ?? [];
    this.applyFilters();
  }
constructor(private router: Router) {
}
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

  get eventsAutomotive(): EventDto[] {
    return this._eventsAutomotive;
  }

  filterFrom: string = '';
  filterTo: string = '';

  openDetails(id: string): void {
    this.router.navigate(['/event/details', id]);
  }

  more(id: string): void {
    this.router.navigate(['/event/details', id]);
  }

  join(id: string): void {
    console.log('Join event', id);
  }


  skip(id: string): void {
    console.log('Skip event', id);
  }

  protected readonly toDate = toDate;
  protected readonly toDateDisplay = toDateDisplay;
}
