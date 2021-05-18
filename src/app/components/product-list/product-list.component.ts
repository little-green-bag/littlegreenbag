import { Store } from '@ngrx/store';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { loadProducts } from '@actions/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  data$: Observable<any>;

  constructor(private store: Store<{ products: any }>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  ngAfterViewInit(): void {
    // this.data$ = this.store.select(selectProducts);
    // this.data$.subscribe((res) => console.log('data is ', res));
  }
}
