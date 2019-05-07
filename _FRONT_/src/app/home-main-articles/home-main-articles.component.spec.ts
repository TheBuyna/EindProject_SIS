import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainArticlesComponent } from './home-main-articles.component';

describe('HomeMainArticlesComponent', () => {
  let component: HomeMainArticlesComponent;
  let fixture: ComponentFixture<HomeMainArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMainArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMainArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
