import {Component, Input} from '@angular/core';
import {CommunityUser} from '../../../model/community-user';
import {CommunityService} from '../../../services/community/community.service';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserSessionService} from '../../../services/user-service.service';

@Component({
  selector: 'app-event-participant-details',
  imports: [CommonModule],
  templateUrl: './event-participant-details.component.html',
  styleUrl: './event-participant-details.component.css'
})
export class EventParticipantDetailsComponent {
participant!: CommunityUser;
  isOwnProfile = false;
  constructor(private userService: CommunityService,
              private route: ActivatedRoute,
              private session: UserSessionService) {
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    console.log(id);
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.participant = user
        this.isOwnProfile = this.session.userId === user.id;

      },
      error: (err) => console.error('Failed to load participant:', err)
    });
  }
}
