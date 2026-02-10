import { Injectable } from '@angular/core';
import {VehicleExpense, VehicleExpenseCreate} from '../../model/vehicle-espense.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleExpenseService {
  private baseUrl = `${environment.urlAddress}/VehicleExpense`;

  constructor(private http: HttpClient) {}

  getAll(vehicleId: string, from?: string, to?: string): Observable<VehicleExpense[]> {
    let url = `${this.baseUrl}?vehicleId=${vehicleId}`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;
    return this.http.get<VehicleExpense[]>(url);
  }

  create(dto: VehicleExpenseCreate): Observable<VehicleExpense> {
    return this.http.post<VehicleExpense>(this.baseUrl, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
