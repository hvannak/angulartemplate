import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PigscaleComponent } from './pigscale.component';

describe('PigscaleComponent', () => {
  let component: PigscaleComponent;
  let fixture: ComponentFixture<PigscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PigscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PigscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
