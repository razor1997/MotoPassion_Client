import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserCreate} from '../../model/user-create.model';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router ) {
    this.registerForm = this.fb.group({})
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
      avatarUrl: ['', Validators.pattern('https?://.+')],
      bio: ['', Validators.maxLength(200)],
      baseLocation: ['', Validators.maxLength(100)]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  submit(): void {
    if (this.registerForm.valid) {
      const userData: UserCreate = this.registerForm.value;
      console.log('Rejestracja zakończona sukcesem', userData);
      // Wykonaj akcję taką jak przesłanie do serwera
    } else {
      console.log('Formularz zawiera błędy');
    }
  }
}
