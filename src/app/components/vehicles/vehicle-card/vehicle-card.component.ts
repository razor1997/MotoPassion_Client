import {Component, Input} from '@angular/core';
import {Vehicle} from '../../../model/vehicle.model';
import {CommonModule} from '@angular/common';
import {VEHICLE_PETROL} from '../vehicle-utils/vehicle-utils';

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

  getfuelLabel(): string {
    if(this.vehicle) {
      return <string>this.vehiclePetrol.at(this.vehicle.fuelType);
    }
    return '-';
  }
}
