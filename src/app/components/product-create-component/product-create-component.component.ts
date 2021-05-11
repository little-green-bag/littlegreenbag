import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit {
  @ViewChild('f') myNgForm;

  productForm: FormGroup;
  defaultImageSrc = '/assets/images/little-green-bag-logo.png';
  currentImgSrc = '';
  selectedImage: any = null;
  categories = [
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

    'categories',
    'delete',
    'image',
  ];
  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.currentImgSrc = this.defaultImageSrc;
    this.buildForm();
  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        imageUrl: [''],
        category: ['products-0', Validators.required],
      }),
    });
  }

  async create(product: ProductModel) {
    const filePath = `${product.category}/${this.selectedImage.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    console.log('file path is ', filePath);
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('url is ', url);
            console.log('product is ', product);
            product['imageUrl'] = url;
            this.productService.createProduct(product, 'products');
            this._notificationService.openSnackBar(
              'Product successfully created',
              'PRODUCTS',
              'green-snackbar'
            );
            this.resetForm();
          });
        })
      )
      .subscribe();
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.productForm.setValue({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      category: 'products-0',
    });
    this.currentImgSrc = this.defaultImageSrc;
    this.selectedImage = null;
    this.myNgForm.resetForm();
    console.log('this is now ', this);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.currentImgSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
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
