import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesBrowseComponent } from './vehicles-browse.component';

describe('VehiclesBrowseComponent', () => {
  let component: VehiclesBrowseComponent;
  let fixture: ComponentFixture<VehiclesBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesBrowseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
