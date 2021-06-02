import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts } from '@store/selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  data$: Observable<any> = of(null);

  constructor(private store: Store,) { }

  ngOnInit(): void {
    this.data$ = this.store.select(selectProducts);
  }

}
