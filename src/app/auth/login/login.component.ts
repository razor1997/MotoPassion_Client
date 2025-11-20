import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../model/login.model';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserSessionService} from '../../services/user-service.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService,
              private session: UserSessionService) {
    this.loginForm = this.fb.group({  })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['test321@gmail.com', [Validators.required, Validators.email]],
      password: ['test321', [Validators.required, Validators.minLength(6)]]
    });
  }
  submit(): void {

    console.log("test login");
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      this.authService.login(loginData).subscribe(
        response => {
          this.session.setUserSession(response.user, response.token);
          this.router.navigate(['/home']);
        },
        error => {
          this.errorMessage = error.message;
          console.log("TESTUJE" +error);
        }
      )
      console.log('Logowanie zakończone sukcesem', loginData);
      // Wykonaj akcję taką jak przesłanie do serwera
    } else {
      console.log('Formularz zawiera błędy');
    }
  }
  logout(): void {
    this.session.logout();
    this.router.navigate(['/login']);
  }

}
