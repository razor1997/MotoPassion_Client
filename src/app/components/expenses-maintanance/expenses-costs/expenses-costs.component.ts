import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Vehicle} from '../../../model/vehicle.model';
import {EXPENSE_CATEGORIES} from '../expenses-utils/expenses-category';

@Component({
  selector: 'app-expenses-costs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses-costs.component.html',
  styleUrl: './expenses-costs.component.css'
})
export class ExpensesCostsComponent {
  expensesCategory = EXPENSE_CATEGORIES;
  @Input() totalCost: number = 0;
  @Input() totalCount: number = 0;

  @Input() filterFrom: string = '';
  @Output() filterFromChange = new EventEmitter<string>();

  @Input() filterTo: string = '';
  @Output() filterToChange = new EventEmitter<string>();

  @Input() category: number = 0;
  @Output() selectedCategory  = new EventEmitter<number>();

  @Input() vehicles: Vehicle[] = [];
  @Input() selectedVehicleId: string | null = null;

  @Output() vehicleChange = new EventEmitter<string>();
  @Output() selectedVehicleChange = new EventEmitter<number>();

  onVehicleChange(id: string) {
    this.vehicleChange.emit(id);
  }
  onCategoryChange(id: string) {
    console.log("testest"+id);
    this.selectedVehicleChange.emit(Number(id));
  }
  onClick()
  {
    if(this.selectedVehicleId){
      this.vehicleChange.emit(this.selectedVehicleId);
    }
  }

  protected readonly onclick = onclick;
}
