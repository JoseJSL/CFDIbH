import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlsPageComponent } from './xmls-page.component';

describe('XmlsPageComponent', () => {
  let component: XmlsPageComponent;
  let fixture: ComponentFixture<XmlsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
