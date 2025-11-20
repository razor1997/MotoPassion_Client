import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationWallComponent } from './inspiration-wall.component';

describe('InspirationWallComponent', () => {
  let component: InspirationWallComponent;
  let fixture: ComponentFixture<InspirationWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationWallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
