import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { ImageLightboxComponent } from '../../image-lightbox/image-lightbox.component';
import { UserSessionService } from '../../../services/user-service.service';
import { categories, fuelTypes } from '../vehicle-utils/vehicle-utils';
import {
  VehicleDetailsDto,
  VehicleExpenseHistoryItemDto
} from '../../../model/vehicle-details.model';
import {EXPENSE_CATEGORIES} from '../../expenses-maintanance/expenses-utils/expenses-category';

@Component({
  selector: 'app-vehicle-preview',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ImageLightboxComponent
  ],
  templateUrl: './vehicle-preview.component.html',
  styleUrl: './vehicle-preview.component.css'
})
export class VehiclePreviewComponent {
  vehicleId: string | null = null;
  details: VehicleDetailsDto | null = null;
  activeImageUrl: string | null = null;

  protected readonly categories = EXPENSE_CATEGORIES;
  protected readonly fuelTypes = fuelTypes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');

    if (!this.vehicleId) {
      return;
    }

    this.loadDetails();
  }

  loadDetails(): void {
    if (!this.vehicleId) {
      return;
    }

    this.vehicleService.getDetails(this.vehicleId, this.session.userId ?? undefined).subscribe({
      next: (details) => {
        this.details = details;
      },
      error: (err) => {
        console.error('Failed to load vehicle details:', err);
      }
    });
  }

  back(): void {
    this.router.navigate(['/vehicles/user-list']);
  }

  openImage(): void {
    if (this.details?.vehicle.imageUrl) {
      this.activeImageUrl = this.details.vehicle.imageUrl;
    }
  }

  openFactureImage(url?: string | null): void {
    if (url) {
      this.activeImageUrl = url;
    }
  }

  closeImage(): void {
    this.activeImageUrl = null;
  }

  get vehicle() {
    return this.details?.vehicle ?? null;
  }

  get expenses(): VehicleExpenseHistoryItemDto[] {
    return this.details?.expenses ?? [];
  }

  get isOwner(): boolean {
    return !!this.details?.isOwner;
  }

  get privateData() {
    return this.details?.privateData ?? null;
  }

  getCategoryName(id: number): string {
    return this.categories.find((c) => c.id === id)?.name ?? 'Inne';
  }

  getFuelName(id: number): string {
    return this.fuelTypes.find((f) => f.id === id)?.name ?? 'Inne';
  }
  goToEdit(): void {
    if (!this.vehicleId) return;
    this.router.navigate(['/vehicles/edit', this.vehicleId]);
  }

  deleteVehicle(): void {
    if (!this.vehicleId) return;

    const currentUserId = this.session.userId;
    if (!currentUserId) return;

    const confirmed = confirm('Czy na pewno chcesz usunąć to auto?');
    if (!confirmed) return;

    this.vehicleService.delete(this.vehicleId, currentUserId).subscribe({
      next: () => {
        this.router.navigate(['/vehicles/user-list']);
      },
      error: (err) => {
        console.error('Nie udało się usunąć pojazdu:', err);
      }
    });
  }
}
