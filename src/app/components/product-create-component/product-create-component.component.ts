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
import { CategoryGroups, defaultImageSrc } from '@config/index';
import { addProductImage, getProduct, removeProductImage } from '@store/actions/products.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit, OnDestroy {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  selectedProduct: Observable<ProductModel>;
  selectedFiles = [];
  productForm: FormGroup;
  defaultImageSrc = defaultImageSrc;
  formSubmitted = false;
  categoryGroups = CategoryGroups;
  createdImages = [];
  // editObjectId = null;

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.route.params.subscribe((params) => {
    //   const { id } = params;
    //   console.log('received id is ', id);
    //   if (id) {
    //     this.editObjectId = id;
    //   }
    // });
  }

  extractItemToEdit(id) {

  }

  ngOnInit(): void {
    // if (this.editObjectId) {
    //   this.store.dispatch(getProduct({ id: this.editObjectId }));
    // }
    this.buildForm();
    this.selectedProduct = this.store.select(selectSelectedProduct);
  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        stockCount: [0, Validators.required],
      }),
    });
  }

  onComplete(image) {
    console.log('inside image with ', image);
    this.createdImages.push(image);
    this.store.dispatch(addProductImage({ image }));
  }

  onRemove(file): void {
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== file.name);
    const match = this.createdImages.filter(im => im.name === file.name);
    if (match.length) {
      this.store.dispatch(removeProductImage({ image: match[0] }));
    }
  }

  uploadProduct() {
    this.selectedProduct.subscribe(res => {
      this.productService.createProduct(res, 'latest-products').then(() => {
        this.reset();
        this.store.dispatch(stopSpinner());
      })
    })
  }

  reset() {
    this.store.dispatch(resetProductCreateObject());
    this.selectedFiles = [];
    this.formDirective.resetForm();
    this.myNgForm.resetForm();
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.formSubmitted = false;
  }

  onFilesSelected(event: any) {
    const currentItems = [...this.selectedFiles];
    let newItems = [...event.target.files];
    newItems = newItems.filter(i => {
      const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
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

  updateObject(key, value): void {
    this.store.dispatch(updateProductCreateObject({ key, value }));
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