// import * as ProductActions from '@actions/products.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from '@models/product.model';
import { SidenavService } from '@services/shared/sidenav/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ProductModel[]> = this.store.select((state) => state.cart);

  constructor(
    private store: Store<any>,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.store.select('cart').subscribe((state) => (this.cart$ = state));
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
