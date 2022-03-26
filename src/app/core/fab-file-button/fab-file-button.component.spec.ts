import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabFileButtonComponent } from './fab-file-button.component';

describe('FabFileButtonComponent', () => {
  let component: FabFileButtonComponent;
  let fixture: ComponentFixture<FabFileButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabFileButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabFileButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
