import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: {
    avatarUrl: string;
    name: string;
    car: string;
    miles: number;
    friends: number;
  } = { avatarUrl:'', name: '', car: '', miles: 0, friends: 0 };
}
