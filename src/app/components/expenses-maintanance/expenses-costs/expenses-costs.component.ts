import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Vehicle} from '../../../model/vehicle.model';

@Component({
  selector: 'app-expenses-costs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses-costs.component.html',
  styleUrl: './expenses-costs.component.css'
})
export class ExpensesCostsComponent {
  @Input() totalCost: number = 0;
  @Input() totalCount: number = 0;

  @Input() filterFrom: string = '';
  @Output() filterFromChange = new EventEmitter<string>();

  @Input() filterTo: string = '';
  @Output() filterToChange = new EventEmitter<string>();
  @Input() vehicles: Vehicle[] = [];
  @Input() selectedVehicleId: string | null = null;

  @Output() vehicleChange = new EventEmitter<string>();

  onVehicleChange(id: string) {
    this.vehicleChange.emit(id);
  }
}
