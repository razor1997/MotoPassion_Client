// expense-details.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageLightboxComponent } from '../../image-lightbox/image-lightbox.component';
import { VehicleExpenseService } from '../../../services/vehicle-expense/vehicle-expense.service';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { UserSessionService } from '../../../services/user-service.service';
import { VehicleExpense } from '../../../model/vehicle-espense.model';
import { Vehicle } from '../../../model/vehicle.model';
import { EXPENSE_CATEGORIES } from '../expenses-utils/expenses-category';
import { toDateDisplay } from '../../../utils/date-utils';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [CommonModule, ImageLightboxComponent],
  templateUrl: './expense-details.component.html',
  styleUrl: './expense-details.component.css'
})
export class ExpenseDetailsComponent {
  expense: VehicleExpense | null = null;
  vehicle: Vehicle | null = null;

  loading = true;
  error = '';
  activeImageUrl: string | null = null;

  categories = EXPENSE_CATEGORIES;
  displayDate = toDateDisplay;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: VehicleExpenseService,
    private vehicleService: VehicleService,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUserId = this.session.userId;

    if (!id || !currentUserId) {
      this.router.navigate(['/login']);
      return;
    }

    this.expenseService.getById(id, currentUserId).subscribe({
      next: (expense) => {
        this.expense = expense;

        this.vehicleService.getById(expense.vehicleId).subscribe({
          next: (vehicle) => {
            this.vehicle = vehicle;
            this.loading = false;
          },
          error: () => {
            this.error = 'Nie udało się pobrać pojazdu.';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Nie udało się pobrać kosztu.';
        this.loading = false;
      }
    });
  }

  get isOwner(): boolean {
    return !!this.vehicle && this.session.userId === this.vehicle.userId;
  }

  categoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name ?? 'Nieznana';
  }

  goBack(): void {
    this.router.navigate(['/expenses']);
  }

  goToEdit(): void {
    if (!this.expense) return;
    this.router.navigate(['/expenses/edit', this.expense.id]);
  }

  remove(): void {
    const currentUserId = this.session.userId;
    if (!this.expense || !currentUserId) return;

    this.expenseService.delete(this.expense.id, currentUserId).subscribe({
      next: () => this.router.navigate(['/expenses'])
    });
  }

  openImage(url: string): void {
    this.activeImageUrl = url;
  }

  closeImage(): void {
    this.activeImageUrl = null;
  }
}
