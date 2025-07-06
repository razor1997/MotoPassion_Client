import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { JourneysComponent } from './components/journeys/journeys.component';
import { CommunityComponent } from './components/community/community.component';
import { InspirationComponent } from './components/inspiration/inspiration.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppRoutingModule } from './app.routes';
import {HomeComponent} from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterComponent,
    AppComponent,
    JourneysComponent,
    CommunityComponent,
    InspirationComponent,
    LoginComponent,
    HomeComponent,
    ReactiveFormsModule,
    CommonModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [AuthService,
    provideHttpClient()],
  bootstrap: []
})
export class AppModule { }
