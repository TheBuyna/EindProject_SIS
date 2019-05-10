import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public toggle : boolean = true;
  
  toggleEvent(event){
    this.toggle = !this.toggle;
    
    console.log(this.toggle);
  }
  
  ngOnInit() {
    
  }
}
