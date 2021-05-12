import { AuthService } from '@services/auth/auth.service';
import { Component } from '@angular/core';
import { LinksNavigation } from '@config/index';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  links = LinksNavigation;

  constructor(private auth: AuthService) {}
}
