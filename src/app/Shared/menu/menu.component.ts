import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public setlang:string;
  constructor(private translate: TranslateService) {  
    this.setlang= translate.getDefaultLang();
  }
 
  ngOnInit() {
  }
  setlanguage(lan)
  {
    this.translate.setDefaultLang(lan);
    this.setlang= this.translate.getDefaultLang();
  }
}
