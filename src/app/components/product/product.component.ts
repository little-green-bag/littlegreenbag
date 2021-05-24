import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddProduct } from '@actions/cart.actions';
import { ProductModel } from '@models/index';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() productData$: ProductModel;
  constructor(private store: Store<any>) { }


  addToCart(product) {
    this.store.dispatch(new AddProduct(product));
  }
}
