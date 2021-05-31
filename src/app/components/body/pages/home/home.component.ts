import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts } from '@store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data$;
  constructor(private store: Store) {
    this.data$ = this.store.select(selectProducts);
  }

  ngOnInit() {
  }
}
