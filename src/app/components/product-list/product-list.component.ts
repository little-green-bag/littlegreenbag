import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/notifications/notifications.service';
import { ProductModel } from '@models/index';

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
    private _notificationService: NotificationsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const localStorageProducts = localStorage.getItem('products');
    if (!localStorageProducts) {
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

  retrieveImage(p: ProductModel) {
    console.log('p is ', p);
    // const words = p.image_url.split('-');
    // const type = words[0];
    // const item = words[1];
    // console.log('words are ', words);
    return '../../../../assets/bangers/bangers-four.png';
    // return `../../assets/${type}/${item}`;
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
