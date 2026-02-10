import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../../model/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = `${environment.urlAddress}/Vehicles`;

  constructor(private http: HttpClient) {}

  getAll(userId?: string): Observable<Vehicle[]> {
    const url = userId ? `${this.baseUrl}?userId=${userId}` : this.baseUrl;
    return this.http.get<Vehicle[]>(url);
  }
}
