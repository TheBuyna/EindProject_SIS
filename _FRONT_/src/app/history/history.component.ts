import { Component, OnInit, TemplateRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private articleService: ArticleService, private modalService: BsModalService) { }
  modalRef: BsModalRef;
  allHisotryArticles;
  ngOnInit() {
    this.getAllHistoryArticles();
  }

  getAllHistoryArticles() {
    this.articleService.getHistoryArticle().subscribe(
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
      template
      );
  }

}
