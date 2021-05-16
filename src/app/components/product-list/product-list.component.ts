import { Component, OnInit, AfterViewInit } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, zip } from 'rxjs';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { DialogService } from '@services/shared/dialog/dialog.service';
import { ProductModel } from '@models/index';
import { mergeMap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  data$;

  constructor(
    private productService: ProductService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.data$ = this.productService.getCollection('products');
  }
}
