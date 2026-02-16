import { Component } from '@angular/core';
import {Vehicle, VehicleUpdate} from '../../../model/vehicle.model';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../services/vehicle/vehicle.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {categories, fuelTypes} from '../vehicle-utils/vehicle-utils';
import {FilesService} from '../../../services/files.service';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-vehicle-edit',
  imports: [CommonModule,FormsModule],
  templateUrl: './vehicle-edit.component.html',
  styleUrl: './vehicle-edit.component.css'
})
export class VehicleEditComponent {
  id!: string;
  form: VehicleUpdate = {
    userId: '',
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
  };

  saving = false;
  uploading = false;
  image: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.vehicleService.getById(this.id).subscribe({
      next: (v: Vehicle) => {
        this.form = {
          userId: v.userId,
          category: v.category,
          mark: v.mark,
          model: v.model,
          year: v.year,
          horsePower: v.horsePower,
          engineCapacity: v.engineCapacity,
          fuelType: v.fuelType,
          mileage: v.mileage,
          vin: v.vin,
          imageUrl: v.imageUrl
        };
      }
    });
  }

  submit(): void {
    this.saving = true;


    const upload$ = this.image
      ? this.filesService.uploadImage(this.image, 1)
      : of({url: this.form.imageUrl});

    upload$
      .pipe(
        switchMap((result: any) => {
          console.log(result.url);
          this.form.imageUrl = result.url;
          return this.vehicleService.update(this.id, this.form)
        })
      )
      .subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/vehicles/user-list']);
        },
        error: (err) => {
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
  protected readonly categories = categories;
  protected readonly fuelTypes = fuelTypes;
}
