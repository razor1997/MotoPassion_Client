import { Component } from '@angular/core';
import {VehicleCreate} from '../../../model/vehicle.model';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FilesService} from '../../../services/files.service';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-vehicle-add',
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './vehicle-add.component.html',
  styleUrl: './vehicle-add.component.css'
})
export class VehicleAddComponent {
  categories = [
    { id: 1, name: 'Samochód' },
    { id: 2, name: 'Motocykl' },
    { id: 3, name: 'Ciężarówka' },
    { id: 4, name: 'Skuter' },
    { id: 99, name: 'Inne' }
  ];

  fuelTypes = [
    { id: 1, name: 'Benzyna' },
    { id: 2, name: 'Diesel' },
    { id: 3, name: 'Hybryda' },
    { id: 4, name: 'Elektryk' },
    { id: 5, name: 'LPG' },
    { id: 99, name: 'Inne' }
  ];
  uploading = false;
  image: File | null = null;
  imageUrl: string | null = null;

  form: VehicleCreate = {
    userId: localStorage.getItem('userId') || '',
    category: 1,
    mark: '',
    model: '',
    year: new Date().getFullYear(),
    horsePower: 0,
    engineCapacity: 1.0,
    fuelType: 1,
    mileage: undefined,
    vin: '',
    imageUrl: '',
    dateInspection: '',
    dateInsurance: ''
  };

  saving = false;
  constructor(private vehicleService: VehicleService,
              private router: Router,
              private fileService: FilesService) { }

  submit(): void {
    if (!this.form.userId || !this.form.mark || !this.form.model) return;

    this.saving = true;
    const upload$ = this.image
      ? this.fileService.uploadImage(this.image,1)
      : of({ url: '' });

    upload$
      .pipe(
        switchMap((result: any) => {
          console.log(result.url);
          this.form.imageUrl = result.url;
          return this.vehicleService.create(this.form);
        })
      )
      .subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['vehicles/user-list']);
          console.log("Profile saved!")
        },
        error: (err) =>{
          this.saving = false;
          console.error(err)
        }
      });


  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.image = file;
    const reader = new FileReader();
    reader.onload = () => this.imageUrl = reader.result as string;
    reader.readAsDataURL(file);
  }
}
