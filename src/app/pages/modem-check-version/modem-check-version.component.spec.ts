import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModemCheckVersionComponent } from './modem-check-version.component';

describe('ModemCheckVersionComponent', () => {
  let component: ModemCheckVersionComponent;
  let fixture: ComponentFixture<ModemCheckVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModemCheckVersionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModemCheckVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
