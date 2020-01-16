import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroilerscaleComponent } from './broilerscale.component';

describe('BroilerscaleComponent', () => {
  let component: BroilerscaleComponent;
  let fixture: ComponentFixture<BroilerscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroilerscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroilerscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
