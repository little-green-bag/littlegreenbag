import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel, ProductGroupModel } from '@models/index';
import { selectSelectedProduct, selectSelectedProductImages } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { map, tap, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  images: Observable<any>;
  selectedFiles: [];
  files: [];
  productForm: FormGroup;
  defaultImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/littlegreenbag-ecb99.appspot.com/o/products-0%2Fclick-here-to-upload_1620928912575?alt=media&token=d974ff59-7007-4ce7-97ac-feac006c4ad6';
  currentImgSrc = "";
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
    private store: Store
  ) { }

  ngOnInit(): void {
    this.images = this.store.select(selectSelectedProductImages);
    this.buildForm();
  }

  ngAfterViewInit(): void {

  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        images: [''],
        category: ['', Validators.required],
      }),
    });
  }

  async create(product: ProductModel) {
    console.log('product is ', product);
    const { name, description, price, category } = product;
    const filePath = `${product.category}/${name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const result = this.store.select(selectSelectedProduct).pipe(
      map(res => {
        console.log('current selected is ', res);
        console.log('want to add details ', { name, description, price, category });
        return {
          ...res,
          name, description, price, category
        }
      })
    );
    result.subscribe(res => {
      console.log('res is ', res);
      console.log('selectedFiles is ', this.selectedFiles);
      // this.productService.createProduct(product, 'products');
      //         this._notificationService.openSnackBar(
      //           'Product successfully created',
      //           'PRODUCTS',
      //           'green-snackbar'
      //         );
      //         this.resetForm();
      this.store.dispatch(stopSpinner());
    });


  }

  updateObject() {
    const form = this.productForm.value;
    console.log('form is ', form);
    this.store.dispatch(updateProductCreateObject(this.productForm.value));
  }

  reset() {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.currentImgSrc = this.defaultImageSrc;
    this.myNgForm.resetForm();
    this.formSubmitted = false;
  }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
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
    if (this.productForm.valid) {
      this.formSubmitted = true;
      this.store.dispatch(startSpinner());
      this.create(f.product);
    } else {
      this._notificationService.warningAlert(`INVALID FORM - check errors`);
    }
  }
}
