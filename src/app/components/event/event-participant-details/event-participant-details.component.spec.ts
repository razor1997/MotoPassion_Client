import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipantDetailsComponent } from './event-participant-details.component';

describe('EventParticipantDetailsComponent', () => {
  let component: EventParticipantDetailsComponent;
  let fixture: ComponentFixture<EventParticipantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventParticipantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventParticipantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
