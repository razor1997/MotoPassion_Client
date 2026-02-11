import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {
  InspirationWallPostAddComponent
} from './components/inspiration-wall-post-add/inspiration-wall-post-add.component';
import {InspirationUserPostsComponent} from './components/inspiration-user-posts/inspiration-user-posts.component';
import {EventCreateFormComponent} from './components/event/event-create-form/event-create-form.component';
import {ExpensesPageComponent} from './components/expenses-maintanance/expenses-page/expenses-page.component';
import {VehicleAddComponent} from './components/vehicles/vehicle-add/vehicle-add.component';


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
  { path: 'inspirations/add', component: InspirationWallPostAddComponent },
  {path: 'inspirations/users', component: InspirationUserPostsComponent },
  {path: 'event/create', component: EventCreateFormComponent },
  { path: 'expenses', component: ExpensesPageComponent },
  { path: 'vehicles/add', component: VehicleAddComponent },
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
