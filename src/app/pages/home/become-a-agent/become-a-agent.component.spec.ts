import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAAgentComponent } from './become-a-agent.component';

describe('BecomeAAgentComponent', () => {
  let component: BecomeAAgentComponent;
  let fixture: ComponentFixture<BecomeAAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeAAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BecomeAAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
