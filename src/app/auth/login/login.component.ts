import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../model/login.model';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';

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
              private authService: AuthService) {
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
          const token = response.token;
          // console.log("teststsst " + response.);
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('userEmail', response.Email);
          localStorage.setItem('firstName', response.userName);

          this.router.navigate(['/inspiration']);
        },
        error => {
          this.errorMessage = error.message;
          console.log(error);
        }
      )
      console.log('Logowanie zakończone sukcesem', loginData);
      // Wykonaj akcję taką jak przesłanie do serwera
    } else {
      console.log('Formularz zawiera błędy');
    }
  }
}
