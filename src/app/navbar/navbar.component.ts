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
  constructor(private router: Router) {}
  navigateTo(destination: string) {
    this.router.navigate([destination]);
  }
  isUserLoggedIn(): boolean {
    console.log('isUserLoggedIn' + localStorage.getItem('authToken'));
    return !!localStorage.getItem('authToken');
  }
  logoutUser(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }

  ngOnInit(): void {
  }
}
