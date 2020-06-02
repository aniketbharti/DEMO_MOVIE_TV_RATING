import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdpPageComponent } from './pdp-page.component';

describe('PdpPageComponent', () => {
  let component: PdpPageComponent;
  let fixture: ComponentFixture<PdpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
