import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { loadProducts } from '@actions/products.actions';
import { selectProducts } from '@selectors/index';
import { ExcelService } from '@services/shared/excel/excel.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  data$: Observable<any>;

  constructor(private store: Store, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.data$ = this.store.select(selectProducts);
  }

  downloadLatestProductsList(): void {
    this.store.select(selectProducts).subscribe(res => {
      this.excelService.exportAsExcelFile(res, 'products');
    })
  }
}
