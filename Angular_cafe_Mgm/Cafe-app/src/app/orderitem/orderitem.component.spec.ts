import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemComponent } from './orderitem.component';

describe('OrderitemComponent', () => {
  let component: OrderitemComponent;
  let fixture: ComponentFixture<OrderitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
