import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterStepperComponent } from './user-register-stepper.component';

describe('UserRegisterStepperComponent', () => {
  let component: UserRegisterStepperComponent;
  let fixture: ComponentFixture<UserRegisterStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
