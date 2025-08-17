import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalsSearchComponent } from './withdrawals-search.component';

describe('WithdrawalsSearchComponent', () => {
  let component: WithdrawalsSearchComponent;
  let fixture: ComponentFixture<WithdrawalsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawalsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
