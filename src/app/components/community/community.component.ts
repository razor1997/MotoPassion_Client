import { Component } from '@angular/core';
import {UserCardComponent} from '../user-card/user-card.component';
import {NgFor} from '@angular/common';
import {CommunityService} from '../../services/community/community.service';
import {CommonModule} from '@angular/common';
import {CommunityUser} from '../../model/community-user';

@Component({
  selector: 'app-community',
  imports: [
    UserCardComponent, NgFor,CommonModule
  ],
  standalone: true,
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {
  users: CommunityUser[] = [];
  loading = true;
  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading community', err);
        this.loading = false;
      }
    });
  }
}
