import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel, ProductGroupModel } from '@models/index';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;

  productForm: FormGroup;
  defaultImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/littlegreenbag-ecb99.appspot.com/o/products-0%2Fclick-here-to-upload_1620928912575?alt=media&token=d974ff59-7007-4ce7-97ac-feac006c4ad6';
  currentImgSrc = '';
  selectedImage: any = null;
  formSubmitted = false;
  categories: ProductGroupModel[] = [
    { value: 'products', viewValue: 'Products' },
    { value: 'bangers', viewValue: 'Bangers' },
    { value: 'decoration', viewValue: 'Decoration' },
    { value: 'rigs', viewValue: 'Rigs' },
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
        category: ['', Validators.required],
      }),
    });
  }

  async create(product: ProductModel) {
    if (!this.selectedImage) {
      this.formSubmitted = false;
      this._notificationService.warningAlert('Please provide an image');
      return;
    }
    const filePath = `${product.category}/${this.selectedImage?.name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage
      .upload(filePath, this.selectedImage)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
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
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.currentImgSrc = this.defaultImageSrc;
    this.selectedImage = null;
    this.productForm.reset();
    this.myNgForm.resetForm();
    this.formSubmitted = false;
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

  onSubmit(f) {
    console.log('submitting form');
    if (this.productForm.valid) {
      this.formSubmitted = true;
      this.create(f.product);
    } else {
      this._notificationService.warningAlert(`INVALID FORM - check errors`);
    }
  }
}
