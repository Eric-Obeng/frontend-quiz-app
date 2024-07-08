import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  quizService: QuizService = inject(QuizService);
  quizTitle: string = '';
  finalScore!: number;

  constructor() {
    this.quizTitle = this.quizService.getQuizType();
    this.finalScore = this.quizService.getScore();
  }

  ngOnDestroy() {
    this.quizService.setScore(0);
  }

}
