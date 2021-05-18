import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { loadProducts } from '@actions/products.actions';
import { selectProducts } from '@selectors/index';
import { AppState } from '@states/products.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  data$: Observable<any>;

  constructor(private store: Store<{ app: AppState }>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.data$ = this.store.select(selectProducts);
  }
}
