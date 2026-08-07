// expense-edit.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { VehicleExpenseService } from '../../../services/vehicle-expense/vehicle-expense.service';
import { FilesService } from '../../../services/files.service';
import { UserSessionService } from '../../../services/user-service.service';
import { VehicleExpense, VehicleExpenseCreate } from '../../../model/vehicle-espense.model';
import { EXPENSE_CATEGORIES } from '../expenses-utils/expenses-category';
import { toDateInput } from '../../../utils/date-utils';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.css'
})
export class ExpenseEditComponent {
  id = '';
  loading = true;
  error = '';
  savedMessage = '';
  isDirty = false;
  private initialSnapshot = '';

  private buildSnapshot(): string {
    return JSON.stringify({
      vehicleId: this.model.vehicleId,
      title: this.model.title?.trim(),
      description: this.model.description?.trim(),
      cost: Number(this.model.cost),
      date: this.model.date,
      category: Number(this.model.category),
      mileage: Number(this.model.mileage),
      factureImageUrl: this.model.factureImageUrl ?? '',
      hasNewFile: !!this.factureImage
    });
  }

  get hasChanges(): boolean {
    return this.isDirty;
  }

  private markPristine(): void {
    this.initialSnapshot = this.buildSnapshot();
    this.isDirty = false;
    this.savedMessage = '';
  }
  markDirty(): void {
    this.isDirty = true;
    this.savedMessage = '';
  }
  model: VehicleExpenseCreate = {
    vehicleId: '',
    title: '',
    description: '',
    cost: 0,
    date: toDateInput(new Date().toISOString()),
    category: 1,
    mileage: 0,
    factureImageUrl: ''
  };

  factureImage: File | null = null;
  previewUrl: string | null = null;
  categories = EXPENSE_CATEGORIES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: VehicleExpenseService,
    private filesService: FilesService,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const currentUserId = this.session.userId;

    if (!id || !currentUserId) {
      this.router.navigate(['/login']);
      return;
    }

    this.id = id;
    this.loadExpense();
  }

  loadExpense(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId) return;

    this.expenseService.getById(this.id, currentUserId).subscribe({
      next: (expense: VehicleExpense) => {
        this.model = {
          vehicleId: expense.vehicleId,
          title: expense.title,
          description: expense.description ?? '',
          cost: expense.cost ?? 0,
          date: toDateInput(expense.date),
          category: expense.category,
          mileage: expense.mileage ?? 0,
          factureImageUrl: expense.factureImageUrl ?? ''
        };
        this.factureImage = null;
        this.previewUrl = expense.factureImageUrl ?? '';
        this.markPristine();
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać kosztu.';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {

    this.markDirty();
    this.savedMessage = '';
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.factureImage = file;
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);
  }

  save(): void {
    const currentUserId = this.session.userId;
    if (!currentUserId) return;

    const dto: VehicleExpenseCreate = {
      ...this.model,
      cost: Number(this.model.cost),
      mileage: Number(this.model.mileage)
    };

    const upload$ = this.factureImage
      ? this.filesService.uploadImage(this.factureImage, 1)
      : of({ url: this.model.factureImageUrl ?? '' });

    upload$
      .pipe(
        switchMap((result: any) => {
          dto.factureImageUrl = result?.url ?? '';
          return this.expenseService.update(this.id, dto, currentUserId);
        })
      )
      .subscribe({
        next: () => {
          this.savedMessage = 'Zapisano zmiany';
          this.factureImage = null;
          this.markPristine();
          this.router.navigate(['/expenses/details', this.id]);
        },
        error: () => {
          this.error = 'Nie udało się zapisać zmian.';
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/expenses/details', this.id]);
  }
}
