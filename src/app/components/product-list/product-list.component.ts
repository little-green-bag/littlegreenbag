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
    // private notificationService: NotificationsService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getCollection('products').subscribe((reponse) => {
      this.data$ = reponse;
    });
  }

  // delete(e: ProductModel): void {
  //   return this.productService.deleteProduct(e, 'products');
  // }

  // edit(e, obj): void {
  //   obj.action = e;
  //   const ref = this.dialogService.openDialog(obj);
  //   ref.afterClosed().subscribe((res) => {
  //     console.log('res is ', res);
  //     const { event } = res;
  //     switch (event) {
  //       case 'Update':
  //         this.productService.updateProduct(res.data, 'products');
  //         break;
  //       case 'Cancel':
  //         this.notificationService.warningAlert('Operation Cancelled');
  //       default:
  //         this.notificationService.warningAlert('Operation Cancelled');
  //         break;
  //     }
  //   });
  // }
}
