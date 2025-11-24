import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private readonly keys = {
    token: 'authToken',
    userId: 'userId',
    email: 'email',
    firstname: 'firstname',
    lastname: 'lastname',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    username: 'username',

  };

  // --- GET ---
  get token(): string | null {
    return localStorage.getItem(this.keys.token);
  }
  get firstName(): string | null {
    return localStorage.getItem(this.keys.firstname)
  }
  get lastName(): string | null {
    return localStorage.getItem(this.keys.lastname)
  }
  get userId(): string | null {
    return localStorage.getItem(this.keys.userId);
  }
  get bio(): string | null {
    return localStorage.getItem(this.keys.bio);
  }

  get userEmail(): string | null {
    return localStorage.getItem(this.keys.email);
  }
  get avatarUrl(): string | null {
    return localStorage.getItem(this.keys.avatarUrl);
  }


  // --- SETTERY ---
  setUserSession(user: any, token: string) {
    localStorage.setItem(this.keys.token, token);
    localStorage.setItem(this.keys.userId, user.id);
    localStorage.setItem(this.keys.email, user.email);
    localStorage.setItem(this.keys.firstname, user.name);
    localStorage.setItem(this.keys.lastname, user.surname);
    localStorage.setItem(this.keys.avatarUrl, user.avatarUrl);
    localStorage.setItem(this.keys.bio, user.bio);
    localStorage.setItem(this.keys.username, user.username);
  }

   setToken(token: string) {
    localStorage.setItem(this.keys.token, token);
  }
  // --- LOGOUT ---
  logout(): void {
    Object.values(this.keys).forEach(key => localStorage.removeItem(key));
  }

  // --- HELPER ---
  isLoggedIn(): boolean {
    return !!this.token; // true jeśli token istnieje
  }
  isTokenExpired(): boolean {
    const token = this.token;
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();

    return now > exp; // true = token wygasł
  }

  get roles(): string[] {
    const token = this.token;
    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

}

