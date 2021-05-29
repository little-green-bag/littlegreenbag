import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct, selectSelectedProductImages } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { resetProductCreateObject, updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryGroups, defaultImageSrc } from '@config/index';
import { addProductImage, removeProductImage } from '@store/actions/products.actions';

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  selectedProduct: Observable<ProductModel>;
  selectedFiles = [];
  files = [];
  productForm: FormGroup;
  defaultImageSrc = defaultImageSrc;
  formSubmitted = false;
  categoryGroups = CategoryGroups;

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.selectedProduct = this.store.select(selectSelectedProduct);
  }

  ngAfterViewInit(): void {
  }

  updateObject(key, value): void {
    this.store.dispatch(updateProductCreateObject({ key, value }));
  }

  onRemove({ name }): void {
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== name);
    this.store.dispatch(removeProductImage({ name }))
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

  onFileUploadComplete(image): any {
    if (image.url) {
      this.store.dispatch(addProductImage({ image }));
    }
  }

  async uploadProduct() {
    this.selectedProduct.subscribe(res => {
      this.productService.createProduct(res, 'latestTest');
      this.store.dispatch(stopSpinner());
      this.reset();
    })
    // this.selectedProduct.pipe(map(product => {
    //   // const { name, description, price, category } = product; 
    //   //   const filePath = `${product.category}/${name
    //   //     .split('.')
    //   //     .slice(0, -1)
    //   //     .join('.')}_${new Date().getTime()}`;
    //   // }))
    //   console.log('inside upload product with ', product);
    //   // result.subscribe(res => {
    //   this.productService.createProduct(product, 'latestTest');
    //   //         this._notificationService.openSnackBar(
    //   //           'Product successfully created',
    //   //           'PRODUCTS',
    //   //           'green-snackbar'
    //   //         );
    //   //         this.resetForm();
    //   // });

    // }));
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
    let newItems = [...event.target.files];
    const currentItems = [...this.selectedFiles];
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

  update(product: ProductModel) {
    this.productService.updateProduct(product, 'products');
    this._notificationService.openSnackBar(
      'Product successfully updated',
      'PRODUCTS',
      'green-snackbar'
    );
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
