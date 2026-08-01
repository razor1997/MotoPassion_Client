import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { Vehicle } from '../../../model/vehicle.model';
import { categories, fuelTypes } from '../vehicle-utils/vehicle-utils';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vehicles-browse',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './vehicles-browse.component.html',
  styleUrl: './vehicles-browse.component.css'
})
export class VehiclesBrowseComponent {
  vehicles: Vehicle[] = [];
  loading = true;

  searchText = '';
  selectedCategory = 0;
  selectedFuelType = 0;

  protected readonly categories = categories;
  protected readonly fuelTypes = fuelTypes;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;

    this.vehicleService.getAll().subscribe({
      next: (data) => {
        this.vehicles = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load public vehicles:', err);
        this.loading = false;
      }
    });
  }

  get filteredVehicles(): Vehicle[] {
    const text = this.searchText.trim().toLowerCase();
    const category = Number(this.selectedCategory);
    const fuelType = Number(this.selectedFuelType);

    return this.vehicles.filter((vehicle) => {
      const matchesText =
        !text ||
        vehicle.mark.toLowerCase().includes(text) ||
        vehicle.model.toLowerCase().includes(text);

      const matchesCategory =
        category === 0 || vehicle.category === category;

      const matchesFuel =
        fuelType === 0 || vehicle.fuelType === fuelType;

      return matchesText && matchesCategory && matchesFuel;
    });
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategory = 0;
    this.selectedFuelType = 0;
  }

  getCategoryName(id: number): string {
    return this.categories.find((c) => c.id === id)?.name ?? 'Inne';
  }

  getFuelName(id: number): string {
    return this.fuelTypes.find((f) => f.id === id)?.name ?? 'Inne';
  }
}
