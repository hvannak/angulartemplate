import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckscaleComponent } from './truckscale.component';

describe('TruckscaleComponent', () => {
  let component: TruckscaleComponent;
  let fixture: ComponentFixture<TruckscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
