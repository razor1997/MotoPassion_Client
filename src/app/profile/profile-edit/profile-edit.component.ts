import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    bio: '',
    carModel: '',
    baseLocation: ''
  };
  constructor(private https: HttpClient,
              private router: Router,
              private profileService: ProfileService)
  {
  }
  currentAvatar: string | ArrayBuffer | null = null;

ngOnInit(): void {
  this.setUserValue();
}
setUserValue() {
  console.log(localStorage.getItem('firstName'));
  this.user.firstName=   localStorage.getItem('firstName') ?? '';
  this.user.lastName = localStorage.getItem('lastName') ?? '';
  this.user.email=localStorage.getItem('email') ?? '';
  this.user.bio=localStorage.getItem('bio') ?? '';
  this.user.carModel=localStorage.getItem('carModel') ?? '';
  this.user.baseLocation=localStorage.getItem('baseLocation') ?? '';

}
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.currentAvatar = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // tutaj możesz dodać logikę do zapisywania zmian profilu
    console.log("test zapisu danych");
    this.profileService.edit(this.user).subscribe(
      response => this.router.navigate(['/profile/edit'])
      ,error => {
        console.log(error);
      }
    );

    console.log(this.user);
  }

  onCancel(): void {
    // logika dla przycisku anuluj
  }
}
