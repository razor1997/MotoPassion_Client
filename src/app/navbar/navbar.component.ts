import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {UserSessionService} from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  show = true;
  selectedSite: string = 'journeys';
  avatarUrl: string | null = null;
  constructor(private router: Router,
              private session: UserSessionService) {}

  navigateTo(destination: string) {
    this.selectedSite = destination;
    console.log(destination);
    this.router.navigate([destination]);
  }
  isUserLoggedIn(): boolean {
    // console.log('isUserLoggedIn' + localStorage.getItem('authToken'));
    this.avatarUrl = this.session.avatarUrl;
    return !!this.session.token;
  }
  logoutUser(): void {
    this.session.logout();
    this.router.navigate(['login']);
  }
  getTitleSite(): string| null
  {
    switch(this.selectedSite) {
      case 'vehicles/user-list':{
        return 'Twoje pojazdy';
      }break;
      case 'journeys':{
        return "Journeys";
      } break;
      case 'community':{
        return "Community";
      } break;
      case 'inspiration':{
        return "Inspiration";
      }break;
      case 'profile-edit':{
        return "Edycja użytkownika";
      }break;
      case 'inspirations-user-posts':{
        return "Twoje posty";
      }break;
      case 'event-create-form':{
        return "Utwórz wydarzenie";
      }break;
      case 'expenses': {
        return "Eksploatacja";
      } break;
    }
    return '';
  }
  hover = false;

  openAddInspiration() {
    this.router.navigate(['/inspirations/add']);
  }
  openEventCreate(){
    this.router.navigate(['/event/create']);
  }
  openVehicleAdd() {
    this.router.navigate(['/vehicles/add']);
  }

  ngOnInit(): void {
  }
}
