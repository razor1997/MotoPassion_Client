import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesUserListComponent } from './vehicles-user-list.component';

describe('VehiclesUserListComponent', () => {
  let component: VehiclesUserListComponent;
  let fixture: ComponentFixture<VehiclesUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
