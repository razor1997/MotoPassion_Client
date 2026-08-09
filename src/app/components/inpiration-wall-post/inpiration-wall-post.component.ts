import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommunityPost } from '../../model/community-post';

@Component({
  selector: 'app-inpiration-wall-post',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './inpiration-wall-post.component.html',
  styleUrl: './inpiration-wall-post.component.css'
})
export class InpirationWallPostComponent {
  @Input() post!: CommunityPost;

  constructor(private router: Router) {}

  openDetails(): void {
    this.router.navigate(['/inspiration', this.post.id]);
  }

  navigateToLocation(): void {
    if (!this.post.location) return;

    const { lat, lng } = this.post.location;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  }
}
