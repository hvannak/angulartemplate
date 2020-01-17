import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsinfoComponent } from './gpsinfo.component';

describe('GpsinfoComponent', () => {
  let component: GpsinfoComponent;
  let fixture: ComponentFixture<GpsinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
