import {Component, Input} from '@angular/core';
import {CommunityUser} from '../../../model/community-user';
import {CommunityService} from '../../../services/community/community.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserSessionService} from '../../../services/user-service.service';
import {UserPublicProfileDto} from '../../../model/user-public-profile';

@Component({
  selector: 'app-event-participant-details',
  imports: [CommonModule],
  templateUrl: './event-participant-details.component.html',
  styleUrl: './event-participant-details.component.css'
})
export class EventParticipantDetailsComponent {
  participant: UserPublicProfileDto | null = null;
  isOwnProfile = false;
  loading = false;
  error = '';

  constructor(private userService: CommunityService,
              private route: ActivatedRoute,
              private session: UserSessionService,
              private router: Router) {
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Brak identyfikatora użytkownika.';
      return;
    }
    console.log(id);

    this.loadProfile(id);
  }
  loadProfile(id: string): void {
    this.loading = true;

    this.userService.getPublicProfile(id).subscribe({
      next: (participant) => {
        this.participant = participant;
        this.isOwnProfile = this.session.userId === participant.id;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load participant profile:', err);
        this.error = 'Nie udało się pobrać profilu użytkownika.';
        this.loading = false;
      }
    });
  }
  onProfileManagementClick(): void {
    this.router.navigateByUrl('profile/edit');
  }
  onAddVehicleClick(): void {
    this.router.navigateByUrl('vehicles/add');
  }
}
