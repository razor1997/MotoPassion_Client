import { Component } from '@angular/core';
import {UserCardComponent} from '../user-card/user-card.component';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-community',
  imports: [
    UserCardComponent, NgFor
  ],
  standalone: true,
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {
  users = [
    { name: 'John', car: 'Nissan Skyline', miles: 100000, friends: 350, avatarUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1681676462/tu81cyjumfmkhv8wqn1c.jpg'  },
    { name: 'Jane', car: 'Toyota Supra', miles: 85000, friends: 300, avatarUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1681676462/tu81cyjumfmkhv8wqn1c.jpg'  },
    { name: 'Bob', car: 'Mazda RX-7', miles: 120000, friends: 400, avatarUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1681676462/tu81cyjumfmkhv8wqn1c.jpg'  },
    { name: 'Bob', car: 'Mazda RX-7', miles: 120000, friends: 400, avatarUrl: 'https://res.cloudinary.com/dksxe4clc/image/upload/v1681676462/tu81cyjumfmkhv8wqn1c.jpg'  },
    { name: 'Bob', car: 'Mazda RX-7', miles: 120000, friends: 400 , avatarUrl: 'path/to/avatar1.jpg' },
    { name: 'Bob', car: 'Mazda RX-7', miles: 120000, friends: 400, avatarUrl: 'path/to/avatar1.jpg'  }
  ];
}
