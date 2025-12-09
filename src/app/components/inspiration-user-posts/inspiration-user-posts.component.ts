import { Component, Input, OnInit } from '@angular/core';
import {InspirationWallService} from '../../services/inspiration-wall/inspiration-wall.service';
import {CommonModule} from '@angular/common';
import {UserSessionService} from '../../services/user-service.service';
@Component({
  selector: 'app-inspiration-user-posts',
  templateUrl: './inspiration-user-posts.component.html',
  styleUrls: ['./inspiration-user-posts.component.css'],
  imports: [CommonModule]
})
export class InspirationUserPostsComponent implements OnInit {
  @Input() userId!: string;

  posts: any[] = [];
  loading = true;

  constructor(private inspirationWallService: InspirationWallService,
              private session: UserSessionService
              ) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    if (this.session.userId) {
    this.inspirationWallService.getPostsUser(this.session.userId).subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    }
  }
}
