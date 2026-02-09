import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensePartComponent } from '../expense-part/expense-part.component';
import {VehicleExpense} from '../../../model/vehicle-espense.model';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule, ExpensePartComponent],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent {
  @Input() expenses: VehicleExpense[] = [];
  @Output() remove = new EventEmitter<string>();
}
