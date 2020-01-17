import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpstrackingComponent } from './gpstracking.component';

describe('GpstrackingComponent', () => {
  let component: GpstrackingComponent;
  let fixture: ComponentFixture<GpstrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpstrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpstrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
