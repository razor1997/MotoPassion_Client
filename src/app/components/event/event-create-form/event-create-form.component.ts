import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EventService} from '../../../services/events/event.service';
import {of, switchMap} from 'rxjs';
import {FilesService} from '../../../services/files.service';
import {UserSessionService} from '../../../services/user-service.service';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {EventMapComponent} from '../event-map/event-map.component';

@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, EventMapComponent],
  styleUrls: ['./event-create-form.component.css']
})
export class EventCreateFormComponent {
  location: string = "Warszawa";
  form!: FormGroup;
  loading = false;
  imageFile: File | null = null;
  mapLatitude = 52.225665764;
  mapLongitude = 21.003833318;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventService,
    private filesService: FilesService,
    private session: UserSessionService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Date: ['', Validators.required],
      Location: ['', Validators.required],
      Latitude: [52.225665764, Validators.required],
      Longitude: [21.003833318, Validators.required],
      Category: [0, Validators.required],
      MaxCountParticipants: [10, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const formData = new FormData();

    formData.append('Title', this.form.value.Title);
    formData.append('Description', this.form.value.Description);
    formData.append('Date', this.form.value.Date);
    formData.append('Latitude', Number(this.form.value.Latitude).toFixed(9).replace('.', ','));
    formData.append('Longitude', Number(this.form.value.Longitude).toFixed(9).replace('.', ','));
    formData.append('Category', String(this.form.value.Category));
    formData.append('MaxCountParticipants', String(this.form.value.MaxCountParticipants));
    formData.append('CreatorId', this.session.userId ?? '');
    formData.append('Location', this.form.value.Location);

    const upload$ = this.imageFile
      ? this.filesService.uploadImage(this.imageFile, 3)
      : of({ url: '' });

    upload$.pipe(
      switchMap((result: any) => {
        formData.append('PhotoUrl', result.url ?? '');
        return this.eventsService.createEvent(formData);
      })
    ).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Create event error:', err);
        this.loading = false;
      }
    });
  }
  onCoordinatesChange(coords: { latitude: number; longitude: number }): void {
    this.form.patchValue({
      Latitude: coords.latitude,
      Longitude: coords.longitude
    });

    this.mapLatitude = coords.latitude;
    this.mapLongitude = coords.longitude;
  }
}
