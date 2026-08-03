// vehicle-expense.service.ts
import { Injectable } from '@angular/core';
import { VehicleExpense, VehicleExpenseCreate } from '../../model/vehicle-espense.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleExpenseService {
  private baseUrl = `${environment.urlAddress}/VehicleExpense`;

  constructor(private http: HttpClient) {}

  getAll(
    vehicleId: string,
    currentUserId: string,
    from?: string,
    to?: string,
    categoryId?: number
  ): Observable<VehicleExpense[]> {
    let url = `${this.baseUrl}?vehicleId=${encodeURIComponent(vehicleId)}&currentUserId=${encodeURIComponent(currentUserId)}`;
    if (from) url += `&from=${encodeURIComponent(from)}`;
    if (to) url += `&to=${encodeURIComponent(to)}`;
    if (categoryId) url += `&category=${categoryId}`;
    return this.http.get<VehicleExpense[]>(url);
  }

  getAllByVehicleId(vehicleId: string, currentUserId: string): Observable<VehicleExpense[]> {
    const url = `${this.baseUrl}/vehicleId?vehicleId=${encodeURIComponent(vehicleId)}&currentUserId=${encodeURIComponent(currentUserId)}`;
    return this.http.get<VehicleExpense[]>(url);
  }

  getById(id: string, currentUserId: string): Observable<VehicleExpense> {
    return this.http.get<VehicleExpense>(`${this.baseUrl}/${id}?currentUserId=${encodeURIComponent(currentUserId)}`);
  }

  generatePdf(
    vehicleId: string,
    currentUserId: string,
    from?: string,
    to?: string,
    categoryId?: number
  ) {
    let url = `${this.baseUrl}/report?vehicleId=${encodeURIComponent(vehicleId)}&currentUserId=${encodeURIComponent(currentUserId)}`;
    if (from) url += `&from=${encodeURIComponent(from)}`;
    if (to) url += `&to=${encodeURIComponent(to)}`;
    if (categoryId) url += `&category=${categoryId}`;

    window.open(url, '_blank');
  }

  create(dto: VehicleExpenseCreate, currentUserId: string): Observable<VehicleExpense> {
    return this.http.post<VehicleExpense>(`${this.baseUrl}?currentUserId=${encodeURIComponent(currentUserId)}`, dto);
  }

  update(id: string, dto: VehicleExpenseCreate, currentUserId: string): Observable<VehicleExpense> {
    return this.http.put<VehicleExpense>(`${this.baseUrl}/${id}?currentUserId=${encodeURIComponent(currentUserId)}`, dto);
  }

  delete(id: string, currentUserId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}?currentUserId=${encodeURIComponent(currentUserId)}`);
  }
}
