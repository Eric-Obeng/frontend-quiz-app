import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedQuizComponent } from './completed-quiz.component';

describe('CompletedQuizComponent', () => {
  let component: CompletedQuizComponent;
  let fixture: ComponentFixture<CompletedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
