import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorouselGridComponent } from './corousel-grid.component';

describe('CorouselGridComponent', () => {
  let component: CorouselGridComponent;
  let fixture: ComponentFixture<CorouselGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorouselGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorouselGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
