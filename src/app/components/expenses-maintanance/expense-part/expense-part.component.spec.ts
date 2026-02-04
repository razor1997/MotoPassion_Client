import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePartComponent } from './expense-part.component';

describe('ExpensePartComponent', () => {
  let component: ExpensePartComponent;
  let fixture: ComponentFixture<ExpensePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensePartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
