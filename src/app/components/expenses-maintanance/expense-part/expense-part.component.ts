// expense-part.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleExpense } from '../../../model/vehicle-espense.model';
import { EXPENSE_CATEGORIES } from '../expenses-utils/expenses-category';
import { ImageLightboxComponent } from '../../image-lightbox/image-lightbox.component';

@Component({
  selector: 'app-expense-part',
  standalone: true,
  imports: [CommonModule, ImageLightboxComponent],
  templateUrl: './expense-part.component.html',
  styleUrl: './expense-part.component.css'
})
export class ExpensePartComponent {
  @Input() expense!: VehicleExpense;

  @Output() remove = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() showMore = new EventEmitter<string>();

  expensesCategory = EXPENSE_CATEGORIES;

  activeImageUrl: string | null = null;

  getCategoryDetails(id: number) {
    return this.expensesCategory.find(x => x.id === id)?.name;
  }

  openImage(url: string) {
    this.activeImageUrl = url;
  }

  closeImage() {
    this.activeImageUrl = null;
  }
}
