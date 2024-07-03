import { Component } from '@angular/core';
import { QuizQuestionsComponent } from '../quiz-questions/quiz-questions.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

@Component({
  selector: 'app-quitz-interface',
  standalone: true,
  imports: [QuizQuestionsComponent, LandingPageComponent],
  templateUrl: './quitz-interface.component.html',
  styleUrl: './quitz-interface.component.css',
})
export class QuitzInterfaceComponent {}
