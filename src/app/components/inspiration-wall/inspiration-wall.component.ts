import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {CommunityPost} from '../../model/community-post';
import {InspirationWallService} from '../../services/inspiration-wall/inspiration-wall.service';
import {InpirationWallPostComponent} from '../inpiration-wall-post/inpiration-wall-post.component';

@Component({
  selector: 'app-inspiration-wall',
  standalone: true,
  imports: [NgFor, InpirationWallPostComponent],
  templateUrl: './inspiration-wall.component.html',
  styleUrls: ['./inspiration-wall.component.css']
})
export class InspirationWallComponent {
  // inspirations = [
  //   {place: 'Whenever', viewImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg', mapImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1660247933/kupr90zhulz0ai2rswhv.jpg' },
  //   { place: 'Whenever',viewImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1686434783/kaqfzsyiwqmhfqi89dmb.jpg', mapImageUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1660247933/kupr90zhulz0ai2rswhv.jpg' },
  // ];
  posts: CommunityPost[] = [];

  constructor(private inspirationWallervice: InspirationWallService) {}

  ngOnInit(): void {
    this.inspirationWallervice.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
