import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfdiTableComponent } from './cfdi-table.component';

describe('CfdiTableComponent', () => {
  let component: CfdiTableComponent;
  let fixture: ComponentFixture<CfdiTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfdiTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfdiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
