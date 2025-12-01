/**
 * Root module for the Angular application.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { SurveyListComponent } from './features/survey/survey-list/survey-list.component';
import { SurveyFormComponent } from './features/survey/survey-form/survey-form.component';
import { SurveyDetailComponent } from './features/survey/survey-detail/survey-detail.component';

// Services
import { SurveyService } from './core/services/survey.service';
import { ZipCodeService } from './core/services/zipcode.service';

@NgModule({
  declarations: [
    AppComponent,
    SurveyListComponent,
    SurveyFormComponent,
    SurveyDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    SurveyService,
    ZipCodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
