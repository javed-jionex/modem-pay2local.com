import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationV2Component } from './documentation-v2.component';

describe('DocumentationV2Component', () => {
  let component: DocumentationV2Component;
  let fixture: ComponentFixture<DocumentationV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
