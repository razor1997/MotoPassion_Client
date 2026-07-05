
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  iconUrl: '/assets/leaflet/marker-icon.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png'
});
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
  @Input() editable = false;

  @Output() coordinatesChange = new EventEmitter<{ latitude: number; longitude: number }>();

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

    const center: L.LatLngExpression = [this.latitude, this.longitude];

    if (!this.map) {
      this.map = L.map(this.mapContainer.nativeElement).setView(center, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      if (this.editable) {
        this.map.on('click', (event: L.LeafletMouseEvent) => {
          this.updateMarker(event.latlng.lat, event.latlng.lng);
        });
      }
    } else {
      this.map.setView(center, 13);
    }

    this.updateMarker(this.latitude, this.longitude);
  }

  private updateMarker(latitude: number, longitude: number): void {
    if (!this.map) return;

    if (this.marker) {
      this.marker.setLatLng([latitude, longitude]);
    } else {
      this.marker = L.marker([latitude, longitude], {
        draggable: this.editable
      }).addTo(this.map);

      if (this.editable) {
        this.marker.on('dragend', () => {
          const position = this.marker?.getLatLng();
          if (!position) return;

          this.coordinatesChange.emit({
            latitude: position.lat,
            longitude: position.lng
          });
        });
      }

      this.marker.bindPopup(this.location || 'Lokalizacja wydarzenia');
    }

    this.marker.setPopupContent(this.location || 'Lokalizacja wydarzenia');

    if (this.editable) {
      this.coordinatesChange.emit({
        latitude,
        longitude
      });
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
