import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-journeys',
  imports: [],
  templateUrl: './journeys.component.html',
  styleUrl: './journeys.component.css'
})
export class JourneysComponent {
  constructor(private http: HttpClient) { }

}
