import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPageDetailsComponent } from './person-page-details.component';

describe('PersonPageDetailsComponent', () => {
  let component: PersonPageDetailsComponent;
  let fixture: ComponentFixture<PersonPageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
