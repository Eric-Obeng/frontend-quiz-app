import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitzInterfaceComponent } from './quitz-interface.component';

describe('QuitzInterfaceComponent', () => {
  let component: QuitzInterfaceComponent;
  let fixture: ComponentFixture<QuitzInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuitzInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuitzInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
