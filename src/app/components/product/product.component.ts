import { Observable } from 'rxjs';
import { selectSelectedProduct } from './../../store/selectors/index';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddProduct } from '@actions/cart.actions';
import { ProductModel } from '@models/product.model';
import { getProduct } from '@actions/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product$: Observable<ProductModel> = this.store.select(selectSelectedProduct);
  productId: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit() {
    this.subscribeToParams();
    this.store.dispatch(getProduct({ id: this.productId }));
  }

  subscribeToParams(): void {
    this.route.params.subscribe((p) => {
      let id = p['id'];
      this.productId = id;
    });
  }

  addToCart(product) {
    this.store.dispatch(new AddProduct(product));
  }
}
