import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardFormComponent } from './event-card-form.component';

describe('EventCardFormComponent', () => {
  let component: EventCardFormComponent;
  let fixture: ComponentFixture<EventCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
