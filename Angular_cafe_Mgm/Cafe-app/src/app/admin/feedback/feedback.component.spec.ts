import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  FeedbackAdminComponent} from '../../admin/feedback/feedback.component'

describe('FeedbackComponent', () => {
  let component:  FeedbackAdminComponent;
  let fixture: ComponentFixture< FeedbackAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( FeedbackAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
