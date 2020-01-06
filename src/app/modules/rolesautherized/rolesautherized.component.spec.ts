import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesautherizedComponent } from './rolesautherized.component';

describe('RolesautherizedComponent', () => {
  let component: RolesautherizedComponent;
  let fixture: ComponentFixture<RolesautherizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesautherizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesautherizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
