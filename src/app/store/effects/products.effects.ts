import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductModel } from '@models/product.model';
import { ProductService } from '@services/shared/product/product.service';
import { ProductActionTypes } from '@actions/index';

@Injectable()
export class ProductsEffects {
  // getProduct$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductActionTypes.GET_PRODUCT),
  //     mergeMap(({ id }) =>
  //       this.productService.getProduct(id).pipe(
  //         map((actions) => {
  //           const res = actions.payload.data() as ProductModel;
  //           return res;
  //         }),
  //         map(
  //           (product) => {
  //             return {
  //               type: ProductActionTypes.GET_PRODUCT_SUCCESS,
  //               product,
  //             };
  //           },
  //           catchError(() => EMPTY)
  //         )
  //       )
  //     )
  //   )
  // );

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.LOAD_PRODUCTS),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((actions) => {
            return actions.map((action: any) => {
              return this.productService.getProductData(action);
            })
          }
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
  ) { }
}
