import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../model/vehicle.model';
import { CommonModule } from '@angular/common';
import { VEHICLE_PETROL } from '../vehicle-utils/vehicle-utils';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../services/user-service.service';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  @Input() isOwner = false;

  vehiclePetrol = VEHICLE_PETROL;

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private session: UserSessionService
  ) {}

  getfuelLabel(): string {
    if (this.vehicle) {
      return <string>this.vehiclePetrol.at(this.vehicle.fuelType);
    }
    return '-';
  }

  edit() {
    this.router.navigate(['/vehicles/edit', this.vehicle.id]);
  }

  preview() {
    this.router.navigate(['/vehicles/preview', this.vehicle.id]);
  }

  remove() {
    if (!confirm('Usunąć pojazd?')) return;

    const currentUserId = this.session.userId;
    if (!currentUserId) return;

    this.vehicleService.delete(this.vehicle.id, currentUserId).subscribe({
      next: () => window.location.reload()
    });
  }

  goToEdit(): void {
    if (!this.vehicle.id) return;
    this.router.navigate(['/vehicles/edit', this.vehicle.id]);
  }
}
