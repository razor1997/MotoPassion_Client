import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JourneysComponent } from './components/journeys/journeys.component';
import { CommunityComponent } from './components/community/community.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { PostsComponent }  from './components/posts/posts.component';
import {EventsComponent} from './components/events/events.component';
import { LoginComponent} from './auth/login/login.component';
import { RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {ProfileSettingsComponent} from './profile/profile-settings/profile-settings.component';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';
import {AdminPanelComponent} from './components/admin-panel/admin-panel/admin-panel.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },  // Strona startowa
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'journeys', component: JourneysComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'inspiration', component: InspirationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'profile/settings', component: ProfileSettingsComponent },
  { path: 'profile/preferences', component: ProfileSettingsComponent },
  {
    path: 'admin/panel',
    component: AdminPanelComponent,
    canActivate: [RoleGuard],
    data: { role: 'Admin' }
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
