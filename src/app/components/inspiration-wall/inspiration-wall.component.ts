import { Component } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-inspiration-wall',
  standalone: true,
  imports: [NgFor],
  templateUrl: './inspiration-wall.component.html',
  styleUrls: ['./inspiration-wall.component.css']
})
export class InspirationWallComponent {
  inspirations = [
    {place: 'Whenever', viewImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg', mapImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1660247933/kupr90zhulz0ai2rswhv.jpg' },
    { place: 'Whenever',viewImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg', mapImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1660247933/kupr90zhulz0ai2rswhv.jpg' },
  ];
}
