import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsmanualComponent } from './gpsmanual.component';

describe('GpsmanualComponent', () => {
  let component: GpsmanualComponent;
  let fixture: ComponentFixture<GpsmanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsmanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsmanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
