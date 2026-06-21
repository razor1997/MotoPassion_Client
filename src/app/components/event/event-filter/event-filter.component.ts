import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventAutomotive} from '../../../model/event';

@Component({
  selector: 'app-event-filter',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './event-filter.component.html',
  styleUrl: './event-filter.component.css'
})
export class EventFilterComponent {
  @Input() events: EventAutomotive[] = [];
  @Input() filterFrom: string = '';
  @Output() filterFromChange = new EventEmitter<string>();

  @Input() filterTo: string = '';
  @Output() filterToChange = new EventEmitter<string>();


  @Output() filterRefreshClick = new EventEmitter();

  protected readonly onclick = onclick;

  onClick() {
    this.filterRefreshClick.emit();
    console.log(this.filterTo);
  }
}
