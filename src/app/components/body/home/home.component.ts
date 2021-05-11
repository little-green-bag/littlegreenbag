import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  name = 'Angular';

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.signOut();
  }
}
