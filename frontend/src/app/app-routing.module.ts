/**
 * Routing configuration for navigation paths.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './features/survey/survey-list/survey-list.component';
import { SurveyFormComponent } from './features/survey/survey-form/survey-form.component';
import { SurveyDetailComponent } from './features/survey/survey-detail/survey-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/surveys',
    pathMatch: 'full'
  },
  {
    path: 'surveys',
    component: SurveyListComponent
  },
  {
    path: 'surveys/new',
    component: SurveyFormComponent
  },
  {
    path: 'surveys/:id',
    component: SurveyDetailComponent
  },
  {
    path: 'surveys/:id/edit',
    component: SurveyFormComponent
  },
  {
    path: '**',
    redirectTo: '/surveys'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
