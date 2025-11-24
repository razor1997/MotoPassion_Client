import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpirationWallPostComponent } from './inpiration-wall-post.component';

describe('InpirationWallPostComponent', () => {
  let component: InpirationWallPostComponent;
  let fixture: ComponentFixture<InpirationWallPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InpirationWallPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpirationWallPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
