import { Component } from '@angular/core';
import { QuizQuestionsComponent } from '../quiz-questions/quiz-questions.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-quitz-interface',
  standalone: true,
  imports: [QuizQuestionsComponent, LandingPageComponent, HeaderComponent],
  templateUrl: './quitz-interface.component.html',
  styleUrl: './quitz-interface.component.css',
})
export class QuitzInterfaceComponent {}
