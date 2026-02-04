import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCostsComponent } from './expenses-costs.component';

describe('ExpensesCostsComponent', () => {
  let component: ExpensesCostsComponent;
  let fixture: ComponentFixture<ExpensesCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
