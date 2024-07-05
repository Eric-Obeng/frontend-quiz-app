import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  quizService: QuizService = inject(QuizService);
  quizzes: Quiz[] = [];

  constructor() {
    this.quizzes = this.quizService.getQuizzes();
    this.quizService.setQuizType('');
    this.quizService.setScore(0);
  }
}
