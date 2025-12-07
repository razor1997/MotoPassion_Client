import {Component, Input} from '@angular/core';
import {CommunityPost} from '../../model/community-post';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-inpiration-wall-post',
  imports: [
    DatePipe,CommonModule
  ],
  templateUrl: './inpiration-wall-post.component.html',
  styleUrl: './inpiration-wall-post.component.css'
})
export class InpirationWallPostComponent {
  @Input() post!: CommunityPost;

  navigateToLocation() {
    if (!this.post.location) return;

    const { lat, lng } = this.post.location;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  }
}
