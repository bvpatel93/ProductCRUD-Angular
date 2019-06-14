import { Component } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { User } from './login/user';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentUser: User;
  title = 'AngularPOC';
  constructor(
    private authenticationService: AuthenticationService,private translate: TranslateService)
      {
        translate.setDefaultLang('en');
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      }
}
