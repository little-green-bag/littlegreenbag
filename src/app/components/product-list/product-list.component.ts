import { map } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { Observable } from 'rxjs';

interface ProductGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Observable<ProductModel[]>;
  productForm: FormGroup;

  selectedValue: string;

  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'delete',
    'image',
  ];

  productGroups: ProductGroup[] = [
    { value: 'Products', viewValue: 'Products' },
    { value: 'Bangers', viewValue: 'Bangers' },
    { value: 'Decoration', viewValue: 'Decoration' },
    { value: 'Rigs', viewValue: 'Rigs' },
  ];

  constructor(
    private productService: ProductService,
    private _notificationService: NotificationsService
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
          this._notificationService.openSnackBar(
            'Products successfully fetched',
            'PRODUCTS',
            'red-snackbar'
          );
          return result;
        })
      )
    );
  }
}
