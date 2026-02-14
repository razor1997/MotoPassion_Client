import { Component } from '@angular/core';
import {Vehicle, VehicleCreate} from '../../../model/vehicle.model';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {categories, fuelTypes} from '../vehicle-utils/vehicle-utils';

@Component({
  selector: 'app-vehicle-edit',
  imports: [CommonModule,FormsModule],
  templateUrl: './vehicle-edit.component.html',
  styleUrl: './vehicle-edit.component.css'
})
export class VehicleEditComponent {
  id!: string;
  form: VehicleCreate = {
    userId: '',
    category: 1,
    mark: '',
    model: '',
    year: new Date().getFullYear(),
    horsePower: 0,
    engineCapacity: 1.0,
    fuelType: 1,
    mileage: undefined,
    vin: ''
  };

  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.vehicleService.getById(this.id).subscribe({
      next: (v: Vehicle) => {
        this.form = {
          userId: v.userId,
          category: v.category,
          mark: v.mark,
          model: v.model,
          year: v.year,
          horsePower: v.horsePower,
          engineCapacity: v.engineCapacity,
          fuelType: v.fuelType,
          mileage: v.mileage,
          vin: v.vin
        };
      }
    });
  }

  submit(): void {
    this.saving = true;
    this.vehicleService.update(this.id, this.form).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/vehicles/user-list']);
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  protected readonly categories = categories;
  protected readonly fuelTypes = fuelTypes;
}
