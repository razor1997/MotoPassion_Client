import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspirationWallService } from '../../services/inspiration-wall/inspiration-wall.service';
import { CommunityPost } from '../../model/community-post';

@Component({
  selector: 'app-inspiration-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspiration-details.component.html',
  styleUrl: './inspiration-details.component.css'
})
export class InspirationDetailsComponent {
  post: CommunityPost | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inspirationWallService: InspirationWallService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/inspiration']);
      return;
    }

    this.inspirationWallService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: () => {
        this.error = 'Nie udało się pobrać inspiracji.';
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/inspiration']);
  }

  openLocation(): void {
    if (!this.post?.location) return;
    const { lat, lng } = this.post.location;
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  }

  openParticipant(userId: string): void {
    this.router.navigate(['/community/users', userId]);
  }

  share(): void {
    if (!this.post) return;

    const shareData = {
      title: this.post.description,
      text: this.post.description,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    }
  }
}
