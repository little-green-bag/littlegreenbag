import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProduct } from '@store/actions/products.actions';
import { Observable } from 'rxjs';
import { ProductModel } from '@models/index';
import { selectSelectedProduct } from '@store/selectors';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements AfterViewInit {
  product$: Observable<ProductModel> = this.store.select(selectSelectedProduct);
  productId: string;


  constructor(
    private route: ActivatedRoute, private store: Store<any>
  ) {
    this.route.params.subscribe((p) => {
      let id = p['id'];
      this.productId = id;
    });
  }

  ngAfterViewInit(): void {
    // this.store.dispatch(getProduct({ id: this.productId }))
  }



}
