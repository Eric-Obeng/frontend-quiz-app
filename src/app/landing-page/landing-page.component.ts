import { Component, ViewEncapsulation, Input } from '@angular/core';
import * as data from '../../assets/quiz-data.json';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css', '../../styles.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent {

  // quiz type text and image during quiz
  categoryShow:boolean = false
  categoryImg:string = ''
  categoryText:string = ''


  // toggle theme 
  isDark:boolean = true
  sun = "../../assets/icon-sun-dark.svg"
  moon = "../../assets/icon-moon-dark.svg"
  sunlight = "../../assets/icon-sun-light.svg"
  moonlight = "../../assets/icon-moon-light.svg"
  toggleTheme(el:HTMLElement){
    el.toggleAttribute('light')
    this.isDark = !this.isDark
  }
  // toggles quiz menu and questions menu
  isMenu: boolean = true;
  isQuiz: boolean = false;
  isCompleted: boolean = false

  // imorts and saves json in a data variable
  data: any = (data as any).default;
  constructor() {
    console.log(this.data); // For debugging
  }

  // category observer
  category: string | null = '';
  // category number
  categNum: number = 0;
  // question num
  questionNum: number = 0;
  // correct answer
  correctAnswer: string = '';
  // Quiz Score
  totalScore = 0
  // correct option to make green
  correctOption: number = 0;
  // filler progress
  filler: number = 10;
  // error checker
  isError = false;
  // svg
  svg:string = ''
  correctSvg: string = '../../assets/icon-correct.svg' 
  errorSvg: string = '../../assets/icon-error.svg' 

  // quiz menu selection functions
  startQuiz(category: HTMLElement): void {
    this.isMenu = !this.isMenu;
    this.isQuiz = !this.isQuiz;
    this.category = category.textContent;
    this.categoryShow = true
    if (this.category === 'HTML') {
      this.categoryText = 'HTML'
      this.categoryImg = '../../assets/icon-html.svg'
      this.categNum = 0
    }
    if (this.category === 'CSS') {
      this.categoryText = 'CSS'
      this.categoryImg = '../../assets/icon-css.svg'
      this.categNum = 1}
    if (this.category === 'Javascript') {
      this.categoryText = 'Javascript'
      this.categoryImg = '../../assets/icon-js.svg'
      this.categNum = 2
    }
    if (this.category === 'Accessibility') {
      this.categoryText = 'Accessibility'
      this.categoryImg = '../../assets/icon-accessibility.svg'
      this.categNum = 3}
  }

  // selected option function
  selected: string = '';
  isA: boolean = false;
  isB: boolean = false;
  isC: boolean = false;
  isD: boolean = false;
  selectedOption(option: HTMLElement) {
    if (option.textContent === 'A') {
      this.selected = 'A';
      this.isA = true;
      this.isB = false;
      this.isC = false;
      this.isD = false;
    }
    if (option.textContent === 'B') {
      this.selected = 'B';
      this.isA = false;
      this.isB = true;
      this.isC = false;
      this.isD = false;
    }
    if (option.textContent === 'C') {
      this.selected = 'C';
      this.isA = false;
      this.isB = false;
      this.isC = true;
      this.isD = false;
    }
    if (option.textContent === 'D') {
      this.selected = 'D';
      this.isA = false;
      this.isB = false;
      this.isC = false;
      this.isD = true;
    }
  }

  // submit question function
  // boolean to check correct option
  isAcorrect: boolean = false;
  isBcorrect: boolean = false;
  isCcorrect: boolean = false;
  isDcorrect: boolean = false;
  // boolean to check error option
  isAerror: boolean = false
  isBerror: boolean = false
  isCerror: boolean = false
  isDerror: boolean = false
  // boolean to check if selected option is correct
  isAselect: boolean = false
  isBselect: boolean = false
  isCselect: boolean = false
  isDselect: boolean = false
  submitQuestion(checker: HTMLElement) {

    // checks if questions ended
    if(checker.textContent === "Play Again"){
      // toggle screens
      this.isQuiz = false
      this.isCompleted = false
      this.isMenu = true
      // reset all buttons
      this.isAcorrect = false
      this.isBcorrect = false
      this.isCcorrect = false
      this.isDcorrect = false
      // reset all errors
      this.isAerror = false
      this.isBerror = false
      this.isCerror = false
      this.isDerror = false
      // reset progress bar
      this.filler = 10
      // reset score
      this.totalScore = 0
      // reset all options styles to default
      this.isA = false;
      this.isB = false;
      this.isC = false;
      this.isD = false;
      // reset all selected
      this.isAselect = false
      this.isBselect = false
      this.isCselect = false
      this.isDselect = false
      // remove category title
      this.categoryShow = false
      return
    }
    if (checker.textContent === 'Submit Answer') {
      checker.textContent = 'Next Question';
      // reset all options styles to default
      this.isA = false;
      this.isB = false;
      this.isC = false;
      this.isD = false;
      // correct answer
      this.correctAnswer =
        this.data.categories[this.categNum].questions[
          this.questionNum
        ].correctAnswer;
      switch (this.correctAnswer) {
        case 'A':
          this.correctOption = 0;
          break;
        case 'B':
          this.correctOption = 1;
          break;
        case 'C':
          this.correctOption = 2;
          break;
        case 'D':
          this.correctOption = 3;
          break;
        default:
          console.log('No correct answer');
      }
      // check correctOption value : 0=A,1=B,2=C,3=D
      // then toggle the correct attribute on the option
      if (this.correctOption === 0) this.isAcorrect = true;
      if (this.correctOption === 1) this.isBcorrect = true;
      if (this.correctOption === 2) this.isCcorrect = true;
      if (this.correctOption === 3) this.isDcorrect = true;

      // checks if options selected is the correct answer
      if(this.correctAnswer === 'A' && this.selected === 'A'){
        this.isAselect = true
        this.totalScore += 1
      }
      if(this.correctAnswer === 'B' && this.selected === 'B'){
        this.isBselect = true
        this.totalScore += 1
      }
      if(this.correctAnswer === 'C' && this.selected === 'C'){
        this.isCselect = true
        this.totalScore += 1
      }
      if(this.correctAnswer === 'D' && this.selected === 'D'){
        this.isDselect = true
        this.totalScore += 1
      }

      // checks if sumbited answer is wrong(error)
      if(this.correctAnswer !== 'A' && this.selected === 'A'){
        this.isAerror = true
      }
      if(this.correctAnswer !== 'B' && this.selected === 'B'){
        this.isBerror = true
      }
      if(this.correctAnswer !== 'C' && this.selected === 'C'){
        this.isCerror = true
      }
      if(this.correctAnswer !== 'D' && this.selected === 'D'){
        this.isDerror = true
      }
       // checks if all questions are completed
      //  if((this.questionNum + 1) === 11){ 
      //   this.isCompleted = true
      //   this.isQuiz = false
      //   this.questionNum = 0
      // }
      
    } else {
     // checks if all questions are completed
     if((this.questionNum + 1) === 10){ 
      this.isCompleted = true
      this.isQuiz = false
      this.questionNum = 0
      return
    }
      // next question
      this.questionNum++;
      
      // changes button text back to sumbit answer
      checker.textContent = 'Submit Answer';
      // reset all options to default
      this.isAcorrect = false;
      this.isBcorrect = false;
      this.isCcorrect = false;
      this.isDcorrect = false;
      // removes all errors from options
      this.isAerror = false
      this.isBerror = false
      this.isCerror = false
      this.isDerror = false
      // removes all correct effect from option
      this.isAselect = false
      this.isBselect = false
      this.isCselect = false
      this.isDselect = false
      // increase progress fill
      this.filler += 10;
    }
  }
}
