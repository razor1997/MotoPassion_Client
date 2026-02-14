import {Component, Input} from '@angular/core';
import {Vehicle} from '../../../model/vehicle.model';
import {CommonModule} from '@angular/common';
import {VEHICLE_PETROL} from '../vehicle-utils/vehicle-utils';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
   vehiclePetrol = VEHICLE_PETROL;
constructor(private router: Router, private vehicleService: VehicleService) {
}
  getfuelLabel(): string {
    if(this.vehicle) {
      return <string>this.vehiclePetrol.at(this.vehicle.fuelType);
    }
    return '-';
  }
  edit() {
    this.router.navigate(['/vehicles/edit', this.vehicle.id]);
  }

  remove() {
    if (!confirm('Usunąć pojazd?')) return;

    this.vehicleService.delete(this.vehicle.id).subscribe({
      next: () => window.location.reload()
    });
  }
}
