import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-map',
  standalone: true,
  templateUrl: './event-map.component.html',
  styleUrl: './event-map.component.css'
})
export class EventMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() location: string = '';

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private viewInitialized = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized) {
      this.renderMap();
    }
  }

  private renderMap(): void {
    if (this.latitude == null || this.longitude == null) {
      return;
    }

    if (!this.map) {
      this.map = L.map(this.mapContainer.nativeElement).setView(
        [this.latitude, this.longitude],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    } else {
      this.map.setView([this.latitude, this.longitude], 13);
    }

    if (this.marker) {
      this.marker.remove();
    }

    this.marker = L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup(this.location || 'Lokalizacja wydarzenia')
      .openPopup();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
