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
export class ProductListComponent implements OnInit, AfterViewInit {
  products$: Observable<any[]>;
  assets$: Observable<any[]>;
  data$;
  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'edit',
    'delete',
    'image',
  ];

  constructor(
    private productService: ProductService,
    private notificationService: NotificationsService,
    public dialogService: DialogService
  ) {}

  async ngAfterViewInit() {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    console.log('fetching products');
    this.products$ = this.productService.getCollection('products');
    this.assets$ = this.productService.getCollection('assets');
    console.log('typeof this.productsis ', this.products$);
    console.log('typeof this.assetsis ', this.assets$);
    combineLatest([this.products$, this.assets$])
      .pipe(
        map((response) => {
          return [...response[0], ...response[1]];
        })
      )
      .subscribe((reponse) => {
        console.log('reponse is ', reponse);
        this.data$ = reponse;
      });

    // this.data$ = this.products.pipe(mergeMap([this.assets]));
    // console.log('this.data$ is ', this.data$);
    // const subscribe = data$.subscribe((res) => console.log('res is ', res));
    // // localStorage.setItem('products', JSON.stringify(result));
    // this.notificationService.successAlert(
    //   'Products successfully fetched',
    //   'PRODUCTS'
    // );
  }

  delete(e: ProductModel): void {
    console.log('e is ', e);
    return this.productService.deleteProduct(e, e.category);
  }

  edit(e, obj): void {
    obj.action = e;
    const ref = this.dialogService.openDialog(obj);
    ref.afterClosed().subscribe((res) => {
      console.log('res is ', res);
      const { event } = res;
      switch (event) {
        case 'Update':
          this.productService.updateProduct(res.data, 'products');
          break;
        case 'Cancel':
          this.notificationService.warningAlert('Operation Cancelled');
        default:
          this.notificationService.warningAlert('Operation Cancelled');
          break;
      }
    });
  }
}
