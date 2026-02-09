import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExpensesListComponent} from '../expenses-list/expenses-list.component';
import {ExpensesCostsComponent} from '../expenses-costs/expenses-costs.component';
import {Vehicle} from '../../../model/vehicle.model';
import {VehicleExpense, VehicleExpenseCreate} from '../../../model/vehicle-espense.model';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {VehicleExpenseService} from '../../../services/vehicle-expense/vehicle-expense.service';
import {ExpenseCategory} from '../expenses-utils/expenses-category';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ExpensesListComponent, ExpensesCostsComponent],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css'
})
export class ExpensesPageComponent {
  categories: ExpenseCategory[] = [
    ExpenseCategory.Naprawa,2,3,4,5,6
  ];
  vehicles: Vehicle[] = [];
  selectedVehicleId: string | null = null;
  expenses: VehicleExpense[] = [];
  newExpense: VehicleExpense = {
    id: '',
    date: this.today(),
    category: 1,
    title: '',
    cost: 0,
    description: '',
    vehicleId: '',
    createdAt:''
  };

  constructor(
    private vehicleService: VehicleService,
    private expenseService: VehicleExpenseService

  ){}
  ngOnInit(): void {
    this.loadVehicles();
  }
  filterFrom: string = '';
  filterTo: string = '';

  loadVehicles(): void {
    // jeśli masz userId -> wstaw tutaj
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        if (vehicles.length > 0) {
          this.selectedVehicleId = vehicles[0].id;
          this.loadExpenses();
        }
      }
    });
  }

  loadExpenses(): void {
    if (!this.selectedVehicleId) return;

    this.expenseService
      .getAll(this.selectedVehicleId, this.filterFrom || undefined, this.filterTo || undefined)
      .subscribe({
        next: (data) => this.expenses = data
      });
  }
  get filteredExpenses(): VehicleExpense[] {
    return this.expenses
      .filter(e => {
        const d = this.toDate(e.date);
        const from = this.filterFrom ? this.toDate(this.filterFrom) : null;
        const to = this.filterTo ? this.toDate(this.filterTo) : null;
        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get totalCost(): number {
    return this.filteredExpenses.reduce((sum, e) => sum + e.cost, 0);
  }
  addExpense(): void {
    if (!this.selectedVehicleId) return;

    const dto: VehicleExpenseCreate = {
      vehicleId: this.selectedVehicleId,
      title: this.newExpense.title,
      description: this.newExpense.description,
      cost: Number(this.newExpense.cost),
      date: this.newExpense.date,
      category: this.newExpense.category
    };

    this.expenseService.create(dto).subscribe({
      next: () => this.loadExpenses()
    });
  }

  removeExpense(id: string): void {
    this.expenseService.delete(id).subscribe({
      next: () => this.loadExpenses()
    });
  }
  private toDate(value: string): Date {
    return new Date(`${value}T00:00:00`);
  }

  private today(): string {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }
}
