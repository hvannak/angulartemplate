import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderItemsComponent } from './saleorder-items.component';

describe('SaleorderItemsComponent', () => {
  let component: SaleorderItemsComponent;
  let fixture: ComponentFixture<SaleorderItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleorderItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleorderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
