import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAppComponent } from './menu-app.component';

describe('MenuAppComponent', () => {
  let component: MenuAppComponent;
  let fixture: ComponentFixture<MenuAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
