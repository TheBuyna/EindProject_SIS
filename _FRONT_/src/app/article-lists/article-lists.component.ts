import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-lists',
  templateUrl: './article-lists.component.html',
  styleUrls: ['./article-lists.component.scss']
})
export class ArticleListsComponent implements OnInit {

  constructor(private articleService: ArticleService, private modalService: BsModalService, private ngFlashMessageService: NgFlashMessageService, private route: ActivatedRoute) { }
  modalRef: BsModalRef;
  allHisotryArticles;
  errorMe;
  listName;
  listTitle;
  filter;
  p;
  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      this.listName =  params.get('listName');
      this.getAllHistoryArticles(this.listName);
      if (this.listName === 'history') {
        this.listTitle = 'History';
      } else if (this.listName === 'readLater') {
        this.listTitle = 'Read Later';
      }
    });
  }

  getAllHistoryArticles(listName: string) {
    this.articleService.getUserArticle(listName).subscribe(
      (res) => {
        this.allHisotryArticles = res['article'];
        console.log(res);
      },
      (err) => {
        console.log(err)
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      { class: 'custom-modal'}
      );
  }

  deleteArticle(id: string) {
    // ((this.listName == 'history') ? this.articleService.deleteHistoryArticle(id) : this.articleService.deleteReadLaterArticle(id))
    ((this.listName == 'history') ? this.articleService.deleteHistoryArticle(id) : this.articleService.deleteReadLaterArticle(id)).subscribe(
      (res) => {
        console.log(res);
        this.ngFlashMessageService.showFlashMessage({
          messages: [res['success']],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });
        this.getAllHistoryArticles(this.listName)
      },
      (err) => {
        console.log(err);
        this.ngFlashMessageService.showFlashMessage({
          messages: [err.error],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        })
      }
    )
  }

}
