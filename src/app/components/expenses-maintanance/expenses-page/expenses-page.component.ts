import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExpensesListComponent} from '../expenses-list/expenses-list.component';
import {ExpensesCostsComponent} from '../expenses-costs/expenses-costs.component';
import {Vehicle} from '../../../model/vehicle.model';
import {VehicleExpense, VehicleExpenseCreate} from '../../../model/vehicle-espense.model';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {VehicleExpenseService} from '../../../services/vehicle-expense/vehicle-expense.service';
import {EXPENSE_CATEGORIES} from '../expenses-utils/expenses-category';
import {of, switchMap} from 'rxjs';
import {FilesService} from '../../../services/files.service';
// import {ExpenseCategory} from '../expenses-utils/expenses-category';

@Component({
  selector: 'app-expenses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ExpensesListComponent, ExpensesCostsComponent],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css'
})
export class ExpensesPageComponent {
  expensesCategory = EXPENSE_CATEGORIES;

  factureImage: File | null = null;
  factureImageUrl: string | null = null;
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
    createdAt: '',
    mileage: 0,
    factureImageUrl: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private expenseService: VehicleExpenseService,
    private filesService: FilesService
  ) {
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  filterFrom: string = '';
  filterTo: string = '';

  loadVehicles(): void {
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
        return !(to && d > to);

      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get totalCost(): number {
    return this.filteredExpenses.reduce((sum, e) => sum + e.cost, 0);
  }

  addExpense(): void {
    if (!this.selectedVehicleId) return;

    let dto: VehicleExpenseCreate = {
      vehicleId: this.selectedVehicleId,
      title: this.newExpense.title,
      description: this.newExpense.description,
      cost: Number(this.newExpense.cost),
      date: this.newExpense.date,
      category: this.newExpense.category,
      mileage: this.newExpense.mileage,
      factureImageUrl: this.newExpense.factureImageUrl,
    };

    const upload$ = this.factureImage
      ? this.filesService.uploadImage(this.factureImage, 1)
      : of({url: ''});

    upload$
      .pipe(
        switchMap((result: any) => {
          dto.factureImageUrl = result?.url ?? '';
          return this.expenseService.create(dto);
          }
        ))
      .subscribe({
        next: () => {
          this.loadExpenses();
          console.log("Profile saved!")
        },
        error: (err) => console.error(err)
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
  onVehicleSelected(id: string) {
    this.selectedVehicleId = id;
    this.loadExpenses();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.factureImage = file;
    // this.factureImage.name = '';//UtilsFolderNames.vehicle_expenses_factures;
    const reader = new FileReader();
    reader.onload = () => this.factureImageUrl = reader.result as string;
    reader.readAsDataURL(file);
  }
}
