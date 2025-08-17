import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2BComponent } from './b2-b.component';

describe('B2BComponent', () => {
  let component: B2BComponent;
  let fixture: ComponentFixture<B2BComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2BComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B2BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
