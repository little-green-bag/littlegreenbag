import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Cart from '../../store/actions/cart.actions';
// import { PRODUCTS } from '../../store/market';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: ProductModel;

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      let id = p['id'];
      // let result = Array.prototype.filter.call(PRODUCTS, (v) => v.id == id);
      let result = Array.prototype.filter.call(
        [{ id: 777 }],
        (v) => v.id == id
      );

      if (result.length > 0) {
        this.product = result[0];
      }
    });
  }

  addToCart(product) {
    this.store.dispatch(new Cart.AddProduct(product));
  }
}
