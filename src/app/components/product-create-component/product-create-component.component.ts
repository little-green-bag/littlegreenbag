import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProductService } from '@services/shared/product/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { resetProductCreateObject, setProductCreateObject, updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { acceptedImageTypes, CategoryGroups, Collections, defaultImageSrc } from '@config/index';
import { addProductImage, removeProductImage } from '@store/actions/products.actions';
import { cleanFileName } from 'src/app/tools/string.functions';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit, OnDestroy {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  selectedProduct$: Observable<ProductModel>;
  selectedFiles = [];
  productForm: FormGroup;
  defaultImageSrc = defaultImageSrc;
  formSubmitted = false;
  categoryGroups = CategoryGroups;
  createdImages = [];

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private store: Store,
  ) {
  }

  updateObject(key, value): void {
    console.log('value is ', value);
    this.store.dispatch(updateProductCreateObject({ key, value }));
  }

  ngOnInit(): void {
    this.buildForm();
    this.selectedProduct$ = this.store.select(selectSelectedProduct);
  }

  autofill() {

    const product = {
      product: {
        name: 'Jimmy',
        description: 'Description',
        price: 2,
        category: CategoryGroups[0].categories[0].viewValue,
        stockCount: 3,
        images: []
      }
    };
    this.productForm.patchValue(
      product
    );
    this.store.dispatch(setProductCreateObject(product.product));
  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: [0, Validators.required],
        category: ['', Validators.required],
        stockCount: [0, Validators.required],
      }),
    });
  }

  onComplete(image) {
    const match = this.createdImages.filter(i => i.name === image.name);
    if (!match.length) {
      this.createdImages.push(image);
      this.store.dispatch(addProductImage(image));
    }
    this.selectedFiles = this.selectedFiles.filter(f => {
      return cleanFileName(f.name) !== cleanFileName(image.name)
    });
  }

  onRemove(image): void {
    this.store.dispatch(removeProductImage(image));
    this.createdImages = this.createdImages.filter(i => i.name !== image.name);
  }

  uploadProduct() {
    this.selectedProduct$.subscribe(res => {
      this.productService.setProduct(res, Collections.STORE_PRODUCTS).then(() => {
        this._notificationService.successAlert(`${res.name} successfully created`);
        this.reset();
      });
    });
  }

  reset() {
    this.store.dispatch(stopSpinner());
    this.createdImages = [];
    this.selectedFiles = [];
    this.formDirective.resetForm();
    this.formSubmitted = false;
    this.store.dispatch(resetProductCreateObject());
  }

  onFilesSelected(event: any) {
    this.selectedFiles = [...event.target.files];
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.productForm.valid) {
      this.formSubmitted = true;
      this.store.dispatch(startSpinner());
      this.uploadProduct();
    } else {
      this._notificationService.warningAlert(`INVALID FORM - check errors`);
    }
  }

  ngOnDestroy(): void {
    this.reset();
  }
}

// update(product: ProductModel) {
//   this.productService.updateProduct(product, 'products');
//   this._notificationService.openSnackBar(
//     'Product successfully updated',
//     'PRODUCTS',
//     'green-snackbar'
//   );
// }  