import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModalAddAndEditComponent } from './order-modal-add-and-edit.component';

describe('OrderModalAddAndEditComponent', () => {
  let component: OrderModalAddAndEditComponent;
  let fixture: ComponentFixture<OrderModalAddAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderModalAddAndEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderModalAddAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
