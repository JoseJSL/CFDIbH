import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseRegisterStepperComponent } from './enterprise-register-stepper.component';

describe('EnterpriseRegisterStepperComponent', () => {
  let component: EnterpriseRegisterStepperComponent;
  let fixture: ComponentFixture<EnterpriseRegisterStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseRegisterStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseRegisterStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
