import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductActionTypes } from '../../store/actions/products.actions';

@Injectable()
export class ProductsEffects {
  loadProductss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.LOAD_PRODUCTS),
      mergeMap(() =>
        this.productService.getCollection('products').pipe(
          map((actions) =>
            actions.map((action: any) => {
              console.log('inside effect');
              const data = action.payload.doc.data() as ProductModel;
              const id = action.payload.doc.id;
              const result = { id, ...data };
              return result;
            })
          ),
          map(
            (products) => {
              return {
                type: ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
                products,
              };
            },
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
