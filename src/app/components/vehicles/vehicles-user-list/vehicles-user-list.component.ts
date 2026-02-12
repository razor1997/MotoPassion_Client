import { Component } from '@angular/core';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {Vehicle} from '../../../model/vehicle.model';
import {VehicleCardComponent} from '../vehicle-card/vehicle-card.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vehicles-user-list',
  imports: [
    VehicleCardComponent,CommonModule
  ],
  templateUrl: './vehicles-user-list.component.html',
  styleUrl: './vehicles-user-list.component.css'
})
export class VehiclesUserListComponent {
  vehicles: Vehicle[] = [];
  loading = true;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') || undefined;

    this.vehicleService.getAll(userId).subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
