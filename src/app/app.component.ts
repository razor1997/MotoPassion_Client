import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {CommunityComponent} from './components/community/community.component';
import {UserSessionService} from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Feel the road';
  constructor(private session: UserSessionService, private router: Router) {}

  ngOnInit() {
    if (this.session.isTokenExpired()) {
      this.session.logout();
      this.router.navigate(['/login']);
    }
  }

}
