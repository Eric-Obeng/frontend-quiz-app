import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';

import { QuizGuard } from './quiz.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Home page',
  },
  {
    path: ':title',
    component: QuizComponent,
    title: 'Quiz Questions',
    canActivate: [QuizGuard],
  },
  {
    path: ':title/quizcomplete',
    component: ResultsComponent,
    title: 'Quiz Completed',
    canActivate: [QuizGuard],
  },
];
