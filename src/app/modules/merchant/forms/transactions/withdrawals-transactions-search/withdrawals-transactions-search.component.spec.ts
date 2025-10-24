import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsTransactionsSearchComponent } from './withdrawals-transactions-search.component';

describe('WithdrawalsTransactionsSearchComponent', () => {
  let component: WithdrawalsTransactionsSearchComponent;
  let fixture: ComponentFixture<WithdrawalsTransactionsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsTransactionsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalsTransactionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
