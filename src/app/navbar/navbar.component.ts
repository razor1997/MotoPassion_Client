import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

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
  constructor(private router: Router) {}
  navigateTo(destination: string) {
    this.selectedSite = destination;
    this.router.navigate([destination]);
  }
  isUserLoggedIn(): boolean {
    console.log('isUserLoggedIn' + localStorage.getItem('authToken'));
    return !!localStorage.getItem('authToken');
  }
  logoutUser(): void {
    this.router.navigate(['login']);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }
  getTitleSite(): string| null
  {
    switch(this.selectedSite) {
      case 'journeys':{
        return "Journeys";
      }break;
      case 'community':{
        return "Community";
      }break;
      case 'inspiration':{
        return "Inspiration";
      }break;
      case 'profile-edit':{
        return "Edycja użytkownika";
      }break;
    }
    return '';
  }
  ngOnInit(): void {
  }
}
