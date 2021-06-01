import { AuthService } from '@services/core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LinksNavigation } from '@config/index';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  links = LinksNavigation;
  user$: Observable<any>;
  userSubscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user$ = this.auth.getUserStatus();
  }

  ngOnDestroy() {
  }
}
