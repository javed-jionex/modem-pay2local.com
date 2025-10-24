import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsTransactionsSearchComponent } from './deposits-transactions-search.component';

describe('DepositsTransactionsSearchComponent', () => {
  let component: DepositsTransactionsSearchComponent;
  let fixture: ComponentFixture<DepositsTransactionsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsTransactionsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsTransactionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
