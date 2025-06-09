import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Login} from '../../model/login.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({  })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  submit(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      console.log('Logowanie zakończone sukcesem', loginData);
      // Wykonaj akcję taką jak przesłanie do serwera
    } else {
      console.log('Formularz zawiera błędy');
    }
  }
}
