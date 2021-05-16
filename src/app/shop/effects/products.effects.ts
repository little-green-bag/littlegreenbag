import { ProductModel } from './../../models/product.model';
import { productTypes } from './../actions/products.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductsEffects {
  loadProductss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productTypes.loadProducts),
      mergeMap(() =>
        this.productService.getCollection('products').pipe(
          map((actions) =>
            actions.map((action) => {
              const data = action.payload.doc.data() as ProductModel;
              const id = action.payload.doc.id;
              const result = { id, ...data };
              return result;
            })
          ),
          map(
            (products) => ({
              type: productTypes.loadProductsSuccess,
              products,
            }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
