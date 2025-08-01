import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
    avatar: ''
  };

  currentAvatar: string | ArrayBuffer | null = null;

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
    console.log(this.user);
  }

  onCancel(): void {
    // logika dla przycisku anuluj
  }
}
