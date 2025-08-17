import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectMultipleWithdrawalsComponent } from './reject-multiple-withdrawals.component';

describe('RejectMultipleWithdrawalsComponent', () => {
  let component: RejectMultipleWithdrawalsComponent;
  let fixture: ComponentFixture<RejectMultipleWithdrawalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectMultipleWithdrawalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectMultipleWithdrawalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
