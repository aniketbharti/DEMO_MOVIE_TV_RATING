import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRatedMoviesListComponent } from './my-rated-movies-list.component';

describe('MyRatedMoviesListComponent', () => {
  let component: MyRatedMoviesListComponent;
  let fixture: ComponentFixture<MyRatedMoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRatedMoviesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRatedMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
