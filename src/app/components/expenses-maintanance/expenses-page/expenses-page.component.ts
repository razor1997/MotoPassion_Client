// expenses-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpensesListComponent } from '../expenses-list/expenses-list.component';
import { ExpensesCostsComponent } from '../expenses-costs/expenses-costs.component';
import { Vehicle } from '../../../model/vehicle.model';
import { VehicleExpense, VehicleExpenseCreate } from '../../../model/vehicle-espense.model';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { VehicleExpenseService } from '../../../services/vehicle-expense/vehicle-expense.service';
import { EXPENSE_CATEGORIES } from '../expenses-utils/expenses-category';
import { of, switchMap } from 'rxjs';
import { FilesService } from '../../../services/files.service';
import { toDate, today } from '../../../utils/date-utils';
import { UserSessionService } from '../../../services/user-service.service';

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
  categoryId: number | null = null;
  expenses: VehicleExpense[] = [];

  filterFrom: string = '';
  filterTo: string = '';

  newExpense: VehicleExpense = {
    id: '',
    date: today(),
    category: 1,
    title: '',
    cost: null,
    description: '',
    vehicleId: '',
    createdAt: '',
    mileage: null,
    factureImageUrl: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private expenseService: VehicleExpenseService,
    private filesService: FilesService,
    private session: UserSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    const userId = this.session.userId;
    if (!userId) return;

    this.vehicleService.getAll(userId).subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;

        if (!this.selectedVehicleId && vehicles.length > 0) {
          this.selectedVehicleId = vehicles[0].id;
        }

        this.loadExpenses();
      }
    });
  }

  loadExpenses(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId || !this.selectedVehicleId) return;

    this.expenseService
      .getAll(
        this.selectedVehicleId,
        currentUserId,
        this.filterFrom || undefined,
        this.filterTo || undefined,
        this.categoryId || undefined
      )
      .subscribe({
        next: (data) => this.expenses = data
      });
  }

  get filteredExpenses(): VehicleExpense[] {
    return this.expenses
      .filter(e => {
        const d = toDate(e.date);
        const from = this.filterFrom ? toDate(this.filterFrom) : null;
        const to = this.filterTo ? toDate(this.filterTo) : null;

        if (from && d < from) return false;
        return !(to && d > to);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  get totalCost(): number {
    return this.filteredExpenses.reduce((sum, e) => sum + (e.cost ?? 0), 0);
  }

  addExpense(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId || !this.selectedVehicleId) return;

    const dto: VehicleExpenseCreate = {
      vehicleId: this.selectedVehicleId,
      title: this.newExpense.title,
      description: this.newExpense.description,
      cost: Number(this.newExpense.cost),
      date: this.newExpense.date,
      category: this.newExpense.category,
      mileage: Number(this.newExpense.mileage),
      factureImageUrl: this.newExpense.factureImageUrl
    };

    const upload$ = this.factureImage
      ? this.filesService.uploadImage(this.factureImage, 1)
      : of({ url: '' });

    upload$
      .pipe(
        switchMap((result: any) => {
          dto.factureImageUrl = result?.url ?? '';
          return this.expenseService.create(dto, currentUserId);
        })
      )
      .subscribe({
        next: () => {
          this.loadExpenses();
          this.setDefaultValuesForNewExpense();
        },
        error: (err) => console.error(err)
      });
  }

  private setDefaultValuesForNewExpense(): void {
    this.newExpense = {
      id: '',
      date: today(),
      category: 1,
      title: '',
      cost: null,
      description: '',
      vehicleId: '',
      createdAt: '',
      mileage: null,
      factureImageUrl: ''
    };
    this.factureImage = null;
    this.factureImageUrl = null;
  }

  removeExpense(id: string): void {
    const currentUserId = this.session.userId;
    if (!currentUserId) return;

    this.expenseService.delete(id, currentUserId).subscribe({
      next: () => this.loadExpenses()
    });
  }

  onVehicleSelected(id: string): void {
    this.selectedVehicleId = id;
    this.loadExpenses();
  }

  onCategorySelected(id: number): void {
    this.categoryId = id;
    this.loadExpenses();
  }

  onFilterRefreshClick(): void {
    this.loadVehicles();
  }

  onPdfGenerateClick(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId || !this.selectedVehicleId) return;

    this.expenseService.generatePdf(
      this.selectedVehicleId,
      currentUserId,
      this.filterFrom || undefined,
      this.filterTo || undefined,
      this.categoryId || undefined
    );
  }

  onExpenseDetails(id: string): void {
    this.router.navigate(['/expenses/details', id]);
  }

  onExpenseEdit(id: string): void {
    this.router.navigate(['/expenses/edit', id]);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.factureImage = file;

    const reader = new FileReader();
    reader.onload = () => this.factureImageUrl = reader.result as string;
    reader.readAsDataURL(file);
  }

  get selectedNameVehicle(): string {
    if (!this.selectedVehicleId) return 'Wybierz pojazd';

    const found = this.vehicles.find((element) => element.id === this.selectedVehicleId);
    return found ? `${found.mark} ${found.model}` : '';
  }
}
