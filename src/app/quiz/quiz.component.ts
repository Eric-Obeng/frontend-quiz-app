import {
  Component,
  inject,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
  PLATFORM_ID,
  Inject,
  Renderer2,
} from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz, Questions } from '../quiz';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  @ViewChildren('optionButton') optionButtons!: QueryList<ElementRef>;
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('noAnswer') noAnswer!: ElementRef;

  quizService: QuizService = inject(QuizService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  renderer: Renderer2 = inject(Renderer2);

  quizzes: Quiz[] = [];
  quizProblems: Questions[] = [];
  problemIndex: number = 0;
  selectedOptionIndex: number = -1;
  score: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.quizzes = this.quizService.getQuizzes();
    this.quizProblems = this.quizzes.filter(
      (quiz) => quiz.title == this.quizService.selectedQuizType
    )[0].questions;

    if (isPlatformBrowser(this.platformId)) {
      this.quizService.setQuizType(
        localStorage.getItem('selectedQuizType') || ''
      );
    }
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  pickOption(index: number) {
    this.selectedOptionIndex = index;

    this.optionButtons.forEach((button, buttonIndex) => {
      if (buttonIndex == index) {
        const selectedOption = button.nativeElement;
        const selectedOptionLetter =
          selectedOption.querySelector('.option-letter');
        this.renderer.setStyle(
          selectedOptionLetter,
          'background-color',
          'var(--purple)'
        );
        this.renderer.setStyle(selectedOptionLetter, 'color', 'var(--white)');
      } else if (buttonIndex !== index) {
        const optionLettersNotSelected =
          button.nativeElement.querySelectorAll('.option-letter');
        optionLettersNotSelected.forEach((letter: HTMLElement) => {
          this.renderer.setStyle(
            letter,
            'background-color',
            'var(--very-light-grayish-blue)'
          );
          this.renderer.setStyle(letter, 'color', 'var(--grayish-blue)');
        });
      }
    });

    this.noAnswer.nativeElement.classList?.remove('active');
  }

  submitAnswer(event: MouseEvent) {
    let submitButton = event.target as HTMLElement;
    let options = this.quizProblems[this.problemIndex].options;
    let answer = this.quizProblems[this.problemIndex].answer;
    let answerIndex = -1;

    for (let i = 0; i < options.length; i++) {
      if (options[i] == answer) answerIndex = i;
    }

    if (this.selectedOptionIndex == -1) {
      this.noAnswer.nativeElement.classList.add('active');
    } else {
      this.optionButtons.forEach((button, index) => {
        if (index === answerIndex && this.selectedOptionIndex === answerIndex) {
          button.nativeElement.style.border = '3px solid var(--green)';
          this.renderer.setStyle(
            button.nativeElement.querySelector('.option-letter'),
            'background-color',
            'var(--green)'
          );
          this.renderer.addClass(button.nativeElement, 'selectedCorrectAnswer');
          this.score++;
        } else if (this.selectedOptionIndex === index) {
          button.nativeElement.style.border = '3px solid var(--red)';
          this.renderer.setStyle(
            button.nativeElement.querySelector('.option-letter'),
            'background-color',
            'var(--red)'
          );
          this.renderer.addClass(button.nativeElement, 'selectedWrongAnswer');
        } else if (index === answerIndex) {
          button.nativeElement.classList.add('correctAnswer');
        }

        button.nativeElement.disabled = true;
      });

      submitButton.style.display = 'none';
      this.nextButton.nativeElement.style.display = 'flex';
    }
  }

  moveToNextQuestion() {
    this.problemIndex = this.problemIndex + 1;
    if (this.problemIndex == 10) {
      this.quizService.setScore(this.score);
      this.router.navigate([this.quizService.selectedQuizType, 'quizcomplete']);
    }

    this.resetComponent();
  }

  resetComponent() {
    this.selectedOptionIndex = -1;

    this.optionButtons.forEach((button) => {
      button.nativeElement.style.border = 'none';
    });

    this.submitButton.nativeElement.style.display = 'flex';
    this.nextButton.nativeElement.style.display = 'none';
  }
}
