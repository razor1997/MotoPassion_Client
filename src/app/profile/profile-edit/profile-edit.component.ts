import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../services/profile.service';
import {CommonModule} from '@angular/common';
import {ProfileEdit} from '../../model/profile-edit';
import {FilesService} from '../../services/files.service';
import {of, switchMap} from 'rxjs';
import {UserSessionService} from '../../services/user-service.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  imports: [
    FormsModule,CommonModule
  ],
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  avatar: File | null = null;
  avatarUrl: string | null = null;
  initials = "AB";
  user= {
    firstName: '',
    surname: '',
    email: '',
    avatarUrl: '',
    bio: '',
    carModel: '',
    baseLocation:'',
  };
  errorMessage: string = "";
  constructor(private https: HttpClient,
              private router: Router,
              private profileService: ProfileService,
              private filesService: FilesService,
              private session: UserSessionService)
  {
  }

ngOnInit(): void {
  console.log(this.user)
  this.setUserValue();
}
setUserValue() {
  console.log('test'+localStorage.getItem('firstname'));
  this.user.firstName =  this.session.firstName ?? '';//   localStorage.getItem('firstname') ?? '';
  this.user.surname = this.session.lastName ?? '';//localStorage.getItem('lastname') ?? '';
  this.user.email= this.session.userEmail ?? '';// localStorage.getItem('email') ?? '';
  this.user.bio=  this.session.bio ?? '';// localStorage.getItem('bio') ?? '';
  this.user.carModel= localStorage.getItem('carModel') ?? '';
  this.user.baseLocation=localStorage.getItem('baseLocation') ?? '';
  this.avatarUrl=this.session.avatarUrl ?? '';//localStorage.getItem('avatarUrl') ?? '';
}
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.avatar = file;
    const reader = new FileReader();
    reader.onload = () => this.avatarUrl = reader.result as string;
    reader.readAsDataURL(file);
    console.log('Dodaje zdjęcie' +this.avatar);
  }

  onSubmit(): void {
  console.log((localStorage.getItem('userId')));
    const formData = new FormData();
    formData.append("Bio", this.user.bio);
    formData.append("CarModel", this.user.carModel);
    formData.append("BaseLocation", this.user.baseLocation);
    formData.append("Name", this.user.firstName);
    formData.append("Surname", this.user.surname);
    formData.append("Email", this.user.email);

    const upload$ = this.avatar
      ? this.filesService.uploadImage(this.avatar,1)
      : of({ url: this.user.avatarUrl });

    upload$
      .pipe(
        switchMap((result: any) => {
          formData.append("AvatarUrl", result.url);
          console.log(result.url);
          console.log(formData.get('AvatarUrl'));
          return this.profileService.edit(formData);
        })
      )
      .subscribe({
        next: () => console.log("Profile saved!"),
        error: (err) => console.error(err)
      });
  }


  onCancel(): void {
    // logika dla przycisku anuluj
  }

}
