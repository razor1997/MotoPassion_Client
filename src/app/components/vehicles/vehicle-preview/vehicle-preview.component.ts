import {Component} from '@angular/core';
import {ExpensesListComponent} from '../../expenses-maintanance/expenses-list/expenses-list.component';
import {Vehicle} from '../../../model/vehicle.model';
import {VehicleExpense} from '../../../model/vehicle-espense.model';
import {VehicleExpenseService} from '../../../services/vehicle-expense/vehicle-expense.service';
import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {DatePipe, NgIf} from '@angular/common';
import {ImageLightboxComponent} from '../../image-lightbox/image-lightbox.component';

@Component({
  selector: 'app-vehicle-preview',
  imports: [
    ExpensesListComponent,
    DatePipe,
    NgIf,
    ImageLightboxComponent
  ],
  templateUrl: './vehicle-preview.component.html',
  styleUrl: './vehicle-preview.component.css'
})
export class VehiclePreviewComponent {
  vehicleId: string | null =null;
  vehicle: Vehicle | undefined;
  expenses: VehicleExpense[] = [];
  activeImageUrl: string | null = null;

  constructor(
    private expenseService: VehicleExpenseService,
    private route: ActivatedRoute,
    private vehicleService: VehicleService) {
  }
  ngOnInit() {
    this.vehicleId = this.route.snapshot.paramMap.get('id')!;
    console.log(this.vehicleId);

    this.vehicleService.getById(this.vehicleId).subscribe({
      next: (v: Vehicle) => {
        this.vehicle = {
          id: v.id,
          createdAt: v.createdAt,
          userId: v.userId,
          category: v.category,
          mark: v.mark,
          model: v.model,
          year: v.year,
          horsePower: v.horsePower,
          engineCapacity: v.engineCapacity,
          fuelType: v.fuelType,
          mileage: v.mileage,
          vin: v.vin,
          imageUrl: v.imageUrl,
          dateInspection: v.dateInspection? v.dateInspection.split('T')[0] : '',
          dateInsurance: v.dateInsurance? v.dateInsurance.split('T')[0] : '',
        };
      }
    });
    this.loadExpenses();
  }
  loadExpenses() {
    if(!this.vehicleId){
      return;}
    this.expenseService
      .getAllByVehicleId(this.vehicleId)
      .subscribe({
        next: (data) => this.expenses = data
      });
  }
  removeExpense(id: string): void {
    this.expenseService.delete(id).subscribe({
      next: () => this.loadExpenses()
    });
  }

  openImage() {
    if (this.vehicle) {
      this.activeImageUrl = this.vehicle.imageUrl;
    }
  }

  closeImage() {
    this.activeImageUrl = null;
  }
}
