import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListsComponent } from './article-lists.component';

describe('ArticleListsComponent', () => {
  let component: ArticleListsComponent;
  let fixture: ComponentFixture<ArticleListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
