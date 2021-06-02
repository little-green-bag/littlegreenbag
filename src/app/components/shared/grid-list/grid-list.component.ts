import { Component, OnInit } from '@angular/core';
import { ImageModel } from '@models/product.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '@store/selectors/products.selector';
import { Observable } from 'rxjs';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {

  constructor(private store: Store) { }

  data$: Observable<any>;
  convertedImages;
  numOfImages = 8;
  images: ImageModel[];

  ngOnInit() {
    this.data$ = this.store.select(selectProducts);
    this.data$.subscribe(res => {
      this.convertedImages = this.convertImages(res);
    })
  }

  convertImages(products): void {
    this.convertImages = products.map(product => {
      const width = 600;
      const height = (Math.random() * (1000 - 400) + 400).toFixed();
      return { ...product, width, height };

    });
    console.log('convertImages is ', this.convertImages);
  }



  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
}