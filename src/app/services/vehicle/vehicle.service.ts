import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle, VehicleCreate} from '../../model/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = `${environment.urlAddress}/Vehicles`;

  constructor(private http: HttpClient) {}

  getAll(userId?: string): Observable<Vehicle[]> {
    const url = userId ? `${this.baseUrl}?userId=${userId}` : this.baseUrl;
    return this.http.get<Vehicle[]>(url);
  }
  create(dto: VehicleCreate): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, dto);
  }
  update(id: string, dto: VehicleCreate) {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: string) {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }


}
