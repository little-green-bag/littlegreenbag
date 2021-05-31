import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { resetProductCreateObject, updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { acceptedImageTypes, CategoryGroups, Collections, defaultImageSrc } from '@config/index';
import { addProductImage, removeProductImage } from '@store/actions/products.actions';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.store.dispatch(updateProductCreateObject({ key, value }));
  }

  ngOnInit(): void {
    this.buildForm();
    this.selectedProduct$ = this.store.select(selectSelectedProduct);
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
    this.createdImages.push(image);
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== image.name);
    this.store.dispatch(addProductImage(image));
  }

  onRemove(image): void {
    this.store.dispatch(removeProductImage(image));
  }

  uploadProduct() {
    this.selectedProduct$.subscribe(res => {
      this.productService.setProduct(res, Collections.PRODUCTS).then(() => {
        this._notificationService.successAlert(`${res.name} successfully created`);
        this.reset();
        this.store.dispatch(stopSpinner());
      });
    });
  }

  reset() {
    this.store.dispatch(resetProductCreateObject());
    this.selectedFiles = [];
    this.formDirective.resetForm();
    this.formSubmitted = false;
  }

  onFilesSelected(event: any) {
    // break this out into its own function as it's used in dialog too
    // add size checks and copys for thumbnails etc..
    const currentItems = [...this.selectedFiles];
    let newItems = [...event.target.files];
    newItems = newItems.filter(i => {
      return i && acceptedImageTypes.includes(i['type']);
    })
    if (!currentItems.length) {
      this.selectedFiles = newItems;
    } else {
      currentItems.forEach(cI => {
        const match = newItems.filter(nI => nI.name.toLowerCase().trim() === cI.name.toLowerCase().trim());
        if (match.length) {
          newItems = newItems.filter(i => i.name.toLowerCase().trim() !== match[0].name.toLowerCase().trim());
        }
      });
      const allFiles = [...currentItems, ...newItems];
      this.selectedFiles = allFiles;
    }
  }



  onSubmit() {
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