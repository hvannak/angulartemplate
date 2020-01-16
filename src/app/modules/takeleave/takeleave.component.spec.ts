import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeleaveComponent } from './takeleave.component';

describe('TakeleaveComponent', () => {
  let component: TakeleaveComponent;
  let fixture: ComponentFixture<TakeleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
