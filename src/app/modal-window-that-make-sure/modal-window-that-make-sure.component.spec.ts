import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWindowThatMakeSureComponent } from './modal-window-that-make-sure.component';

describe('ModalWindowThatMakeSureComponent', () => {
  let component: ModalWindowThatMakeSureComponent;
  let fixture: ComponentFixture<ModalWindowThatMakeSureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowThatMakeSureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWindowThatMakeSureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
