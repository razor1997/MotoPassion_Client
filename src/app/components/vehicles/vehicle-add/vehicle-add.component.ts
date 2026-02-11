import { Component } from '@angular/core';
import {VehicleCreate} from '../../../model/vehicle.model';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {FormBuilder, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vehicle-add',
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './vehicle-add.component.html',
  styleUrl: './vehicle-add.component.css'
})
export class VehicleAddComponent {
  categories = [
    { id: 1, name: 'Samochód' },
    { id: 2, name: 'Motocykl' },
    { id: 3, name: 'Ciężarówka' },
    { id: 4, name: 'Skuter' },
    { id: 99, name: 'Inne' }
  ];

  fuelTypes = [
    { id: 1, name: 'Benzyna' },
    { id: 2, name: 'Diesel' },
    { id: 3, name: 'Hybryda' },
    { id: 4, name: 'Elektryk' },
    { id: 5, name: 'LPG' },
    { id: 99, name: 'Inne' }
  ];

  form: VehicleCreate = {
    userId: localStorage.getItem('userId') || '',
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
  constructor(private vehicleService: VehicleService, private router: Router) { }

  submit(): void {
    if (!this.form.userId || !this.form.mark || !this.form.model) return;

    this.saving = true;
    this.vehicleService.create(this.form).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/inspiration']);
      },
      error: () => {
        this.saving = false;
      }
    });
  }
}
