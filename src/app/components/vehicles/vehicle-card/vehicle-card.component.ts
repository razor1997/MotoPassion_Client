import {Component, Input} from '@angular/core';
import {Vehicle} from '../../../model/vehicle.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.css'
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
  get fuelLabel(): string {
    const map: Record<number, string> = {
      1: 'Benzyna',
      2: 'Diesel',
      3: 'Hybryda',
      4: 'Elektryk',
      5: 'LPG',
      99: 'Inne'
    };
    return map[this.vehicle.fuelType] ?? '—';
  }
}
