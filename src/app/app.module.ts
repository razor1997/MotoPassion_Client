import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Upewnij się, że Router jest zaimportowany prawidłowo
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

@NgModule({
  declarations: [
    RegisterComponent
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
    CommonModule
    // Importuj moduł routingu tylko tutaj
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
