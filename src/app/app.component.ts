import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Feel the road';
  constructor(private router: Router) {}

  navigateTo(destination: string) {
    this.router.navigate([destination]);
  }
}
