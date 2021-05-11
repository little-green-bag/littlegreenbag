import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit {
  productForm: FormGroup;

  selectedValue: string;

  productGroups = [
    { value: 'Products', viewValue: 'Products' },
    { value: 'Bangers', viewValue: 'Bangers' },
    { value: 'Decoration', viewValue: 'Decoration' },
    { value: 'Rigs', viewValue: 'Rigs' },
  ];

  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'delete',
    'image',
  ];
  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
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
}
