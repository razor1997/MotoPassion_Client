import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommunityUser} from '../../model/community-user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: CommunityUser | undefined;
  constructor() {
  }
}
