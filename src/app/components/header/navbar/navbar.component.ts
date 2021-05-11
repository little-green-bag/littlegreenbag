import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductModel } from '@models/product.model';
// import { selectCart } from '@store/selectors/cart.selector';
import { SidenavService } from '@services/shared/sidenav/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // cart$ = this.store.pipe(select(selectCart));

  constructor(
    // private store: Store<{ products: ProductModel[]; cart: [] }>,
    private sidenavService: SidenavService
  ) {}

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
