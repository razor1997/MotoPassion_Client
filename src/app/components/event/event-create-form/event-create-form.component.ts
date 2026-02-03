import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EventService} from '../../../services/events/event.service';
import {of, switchMap} from 'rxjs';
import {FilesService} from '../../../services/files.service';
import {UserSessionService} from '../../../services/user-service.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-event-create-form',
  templateUrl: './event-create-form.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./event-create-form.component.css']
})
export class EventCreateFormComponent {

  form!: FormGroup;
  loading = false;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventService,
    private filesService: FilesService,
    private session: UserSessionService
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      DateTime: ['', Validators.required],
      Latitude: [0, Validators.required],
      Longitude: [0, Validators.required],
      Category: [0, Validators.required],
      MaxCountParticipants: [10, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit() {
    console.log("this.form.value");
    if (this.form.invalid) return;

    this.loading = false;

    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    formData.append('UserId', this.session.userId as string);
    const upload$ = of("");// this.imageFile
      // ? this.filesService.uploadImage(this.imageFile, 3)
      // : of("");

    upload$.pipe(
      switchMap((result: any) => {
        formData.append("PhotoUrl", result.url);

        return this.eventsService.createEvent(formData);
      })
    ).subscribe({
      next: () => this.loading = false,
      error: () => this.loading = false
    })
  }
}
