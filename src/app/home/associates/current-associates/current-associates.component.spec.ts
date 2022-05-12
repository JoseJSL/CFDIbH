import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAssociatesComponent } from './current-associates.component';

describe('CurrentAssociatesComponent', () => {
  let component: CurrentAssociatesComponent;
  let fixture: ComponentFixture<CurrentAssociatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAssociatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
