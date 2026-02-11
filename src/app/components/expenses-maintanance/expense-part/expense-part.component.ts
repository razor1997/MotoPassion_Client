import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleExpense} from '../../../model/vehicle-espense.model';
import {EXPENSE_CATEGORIES} from '../expenses-utils/expenses-category';

@Component({
  selector: 'app-expense-part',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-part.component.html',
  styleUrl: './expense-part.component.css'
})
export class ExpensePartComponent {
  @Input() expense!: VehicleExpense;
  @Output() remove = new EventEmitter<string>();
  @Output() showMore = new EventEmitter<string>();
   expensesCategory = EXPENSE_CATEGORIES;

  getCategoryDetails(id: number) {
    return this.expensesCategory[id].name;
  }
}
