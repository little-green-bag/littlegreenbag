// import * as ProductActions from '@actions/products.actions';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from '@models/product.model';
import { SidenavService } from '@services/shared/sidenav/sidenav.service';
import { selectCart } from '@store/selectors/index';
import { Routes } from '@config/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cart$: Observable<ProductModel[]>;
  routes = Routes;

  constructor(
    private store: Store<any>,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.cart$ = this.store.select(selectCart);
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
