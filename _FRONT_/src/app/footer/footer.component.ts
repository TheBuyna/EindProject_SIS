import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  public toggle1 : boolean = true;
  
  toggleEvent(event){
    this.toggle1 = !this.toggle1;
    console.log("toggled");
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.toggle1=true;
  }
}
