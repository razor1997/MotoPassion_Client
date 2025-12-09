import { Component } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserSessionService} from '../../services/user-service.service';
import {of, switchMap} from 'rxjs';
import {FilesService} from '../../services/files.service';
import {InspirationWallService} from '../../services/inspiration-wall/inspiration-wall.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-inspiration-wall-post-add',
  templateUrl: './inspiration-wall-post-add.component.html',
  imports: [
    FormsModule,CommonModule
  ],
  styleUrls: ['./inspiration-wall-post-add.component.css']
})
export class InspirationWallPostAddComponent {

  imageFile: File | null = null;
  previewImage: string | null = null;
  description: string = "";
constructor(private fb: FormBuilder, private router: Router,
           private session: UserSessionService, private filesService: FilesService,
            private inspirationWallService: InspirationWallService) {
}
  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submitPost() {
    const formData = new FormData();
    formData.append('UserId', this.session.userId as string);
    formData.append("Description", this.description);

    const upload$ = this.imageFile
      ? this.filesService.uploadImage(this.imageFile,2)
      : of("");

    upload$
      .pipe(
        switchMap((result: any) => {
          formData.append("PhotoUrl", result.url);

          console.log(result.url);
          return this.inspirationWallService.post(formData);
        })
      )
      .subscribe({
        next: () =>
          this.router.navigate(['/posts']),
        error: (err) => console.error(err)
      });

    // TODO: Wywołanie serwisu API
  }

}
