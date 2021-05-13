import { DialogComponent } from './../shared/dialog/dialog.component';
import { map } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Observable<ProductModel[]>;
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
    private _notificationService: NotificationsService,
    public dialog: MatDialog
  ) {}

  async ngAfterViewInit() {
    if (this.products) {
      this.products.subscribe((products) => {
        console.log('products are ', products);
      });
    }
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts('products').pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as ProductModel;
          const id = action.payload.doc.id;
          const result = { id, ...data };
          localStorage.setItem('products', JSON.stringify(result));
          this._notificationService.successAlert(
            'Products successfully fetched',
            'PRODUCTS'
          );
          return result;
        })
      )
    );
  }

  delete(product: ProductModel): void {
    this.productService.deleteProduct(product, 'products');
  }

  edit(product: ProductModel): void {
    this.openDialog('Update', product);
  }

  // create dialog service
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const { event } = result;
      switch (event) {
        case 'Update':
          this.productService.updateProduct(result.data, 'products');
          break;
        default:
          this._notificationService.warningAlert('Operation Cancelled');
          break;
      }
    });
  }
}
