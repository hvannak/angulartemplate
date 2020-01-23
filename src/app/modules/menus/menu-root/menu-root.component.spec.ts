import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRootComponent } from './menu-root.component';

describe('MenuRootComponent', () => {
  let component: MenuRootComponent;
  let fixture: ComponentFixture<MenuRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
