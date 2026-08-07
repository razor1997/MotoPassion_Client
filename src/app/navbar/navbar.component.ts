import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserSessionService } from '../services/user-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  show = true;
  selectedSite: string = '';
  avatarUrl: string | null = null;

  constructor(
    private router: Router,
    private session: UserSessionService
  ) {}

  ngOnInit(): void {
    this.setSelectedFromUrl(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setSelectedFromUrl((event as NavigationEnd).urlAfterRedirects);
      });
  }

  private setSelectedFromUrl(url: string): void {
    if (url.startsWith('/vehicles/user-list')) {
      this.selectedSite = 'vehicles/user-list';
      return;
    }

    if (url.startsWith('/vehicles/browse-list')) {
      this.selectedSite = 'vehicles/browse-list';
      return;
    }

    if (url.startsWith('/expenses')) {
      this.selectedSite = 'expenses';
      return;
    }

    if (url.startsWith('/journeys')) {
      this.selectedSite = 'journeys';
      return;
    }

    if (url.startsWith('/community')) {
      this.selectedSite = 'community';
      return;
    }

    if (url.startsWith('/inspiration')) {
      this.selectedSite = 'inspiration';
      return;
    }

    if (url.startsWith('/events')) {
      this.selectedSite = 'events';
      return;
    }

    this.selectedSite = '';
  }

  navigateTo(destination: string) {
    this.selectedSite = destination;
    this.router.navigate([destination]);
  }

  isActive(path: string): boolean {
    return this.selectedSite === path;
  }

  isUserLoggedIn(): boolean {
    this.avatarUrl = this.session.avatarUrl;
    return !!this.session.token;
  }

  logoutUser(): void {
    this.session.logout();
    this.router.navigate(['login']);
  }

  getTitleSite(): string | null {
    switch (this.selectedSite) {
      case 'vehicles/user-list':
        return 'Moje pojazdy';
      case 'vehicles/browse-list':
        return 'Przeglądaj pojazdy';
      case 'journeys':
        return 'Journeys';
      case 'community':
        return 'Community';
      case 'inspiration':
        return 'Inspiration';
      case 'expenses':
        return 'Eksploatacja';
      case 'events':
        return 'Wydarzenia';
      default:
        return '';
    }
  }

  openAddInspiration() {
    this.router.navigate(['/inspirations/add']);
  }

  openEventCreate() {
    this.router.navigate(['/event/create']);
  }

  openVehicleAdd() {
    this.router.navigate(['/vehicles/add']);
  }
}
