import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationWallPostAddComponent } from './inspiration-wall-post-add.component';

describe('InspirationWallPostAddComponent', () => {
  let component: InspirationWallPostAddComponent;
  let fixture: ComponentFixture<InspirationWallPostAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationWallPostAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationWallPostAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
