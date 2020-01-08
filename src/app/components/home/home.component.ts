import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchKeyWord: string;
  constructor(private messengerService: MessengerService,
              private router: Router,
              private msAdalAngular6Service: MsAdalAngular6Service) { }

  ngOnInit() {
  }

  updateProducts(_searchKeyWord_: string) {
    console.log(_searchKeyWord_);
    this.messengerService.spreadNewSearchKeyWord(_searchKeyWord_);
  }

  signOut() {
    localStorage.removeItem('user-identity');
    this.router.navigate(['/login']);
  }

  logout() {
    this.msAdalAngular6Service.logout();
  }
}
