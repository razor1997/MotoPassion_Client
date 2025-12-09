import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationUserPostsComponent } from './inspiration-user-posts.component';

describe('InspirationUserPostsComponent', () => {
  let component: InspirationUserPostsComponent;
  let fixture: ComponentFixture<InspirationUserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationUserPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspirationUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
