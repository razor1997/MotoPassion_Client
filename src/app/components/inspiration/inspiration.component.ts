import { Component } from '@angular/core';
import {InspirationWallComponent} from '../inspiration-wall/inspiration-wall.component';

@Component({
  selector: 'app-inspiration',
  imports: [
    InspirationWallComponent
  ],
  templateUrl: './inspiration.component.html',
  styleUrl: './inspiration.component.css'
})
export class InspirationComponent {

}
