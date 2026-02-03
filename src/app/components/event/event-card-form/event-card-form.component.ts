import {Component, Input} from '@angular/core';
import {EventDto} from '../../../model/event';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-card-form',
  imports: [
    DatePipe
  ],
  templateUrl: './event-card-form.component.html',
  styleUrl: './event-card-form.component.css'
})
export class EventCardFormComponent {
  @Input() event!: EventDto;

  getCategoryName(cat: number): string {
    switch (cat) {
      case 0: return "Spotkanie";
      case 1: return "Zlot";
      case 2: return "Wyprawa";
      default: return "Inne";
    }
  }
}
