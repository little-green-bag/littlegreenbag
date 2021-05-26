import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts, selectSelectedProduct } from '@store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name = 'Angular';
  data$;
  productData$
  constructor(private store: Store) {
    this.data$ = this.store.select(selectProducts);
    this.productData$ = this.store.select(selectSelectedProduct);
  }

  ngOnInit() {
    this.data$.subscribe(res => console.log('this.data is ', res));
  }
}
