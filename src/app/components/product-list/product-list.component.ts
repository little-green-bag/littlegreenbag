import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/notifications/notifications.service';
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
export class ProductListComponent implements OnInit {
  products;
  productForm: FormGroup;

  selectedValue: string;

  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'delete',
  ];

  productGroups: ProductGroup[] = [
    { value: 'Products', viewValue: 'Products' },
    { value: 'Bangers', viewValue: 'Bangers' },
    { value: 'Decoration', viewValue: 'Decoration' },
    { value: 'Rigs', viewValue: 'Rigs' },
  ];

  // dataSource = this.products;
  constructor(
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts('products').pipe(
      map((actions) =>
        actions.map((action) => {
          const data = action.payload.doc.data() as ProductModel;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    console.log(' this.products is ', this.products);

    this._notificationService.openSnackBar(
      'Products successfully fetched',
      'PRODUCTS',
      'red-snackbar'
    );

    this.buildForm();
  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        image_url: [''],
        productGroup: ['products-0', Validators.required],
      }),
    });
  }

  onSubmit(f) {
    if (this.productForm.valid) {
      this.create(f.product);
    } else {
      this._notificationService.openSnackBar(
        `INVALID FORM - check errors `,
        'ERROR-MANAGEMENT',
        'red-snackbar'
      );
    }
  }

  async create(product: ProductModel) {
    await this.productService.createProduct(product, 'products');
    this._notificationService.openSnackBar(
      'Product successfully created',
      'PRODUCTS',
      'green-snackbar'
    );
  }

  update(product: ProductModel) {
    this.productService.updateProduct(product, 'products');
    this._notificationService.openSnackBar(
      'Product successfully updated',
      'PRODUCTS',
      'green-snackbar'
    );
  }

  delete(id: string) {
    console.log('id is ', id);
    this.productService.deleteProduct(id, 'products');
    this._notificationService.openSnackBar(
      'Product successfully deleted',
      'PRODUCTS',
      'red-snackbar'
    );
  }
}
