import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlDetailsComponent } from './xml-details.component';

describe('XmlDetailsComponent', () => {
  let component: XmlDetailsComponent;
  let fixture: ComponentFixture<XmlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
