import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct, selectSelectedProductImages } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryGroups, defaultImageSrc } from '@config/index';
import { addProductImage } from '@store/actions/products.actions';

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
  coverImageSrc = '';
  currentImgSrc = "";
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
    this.coverImageSrc = defaultImageSrc;
  }

  ngAfterViewInit(): void {
  }

  updateObject(key, value): void {
    console.log('key is ', key);
    console.log('value is ', value);
    this.store.dispatch(updateProductCreateObject({ key, value }));
  }

  onRemove(e): void {
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== e.name);

  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        images: [[], Validators.required],
        category: ['', Validators.required],
        stockCount: [0, Validators.required],
      }),
    });
  }

  onComplete(e): any {
    this.store.dispatch(addProductImage(e.url));
  }

  async uploadProduct() {
    this.selectedProduct.subscribe(res => {
      console.log('res is ', res);
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
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.selectedFiles = [];
    this.currentImgSrc = this.coverImageSrc;
    this.myNgForm.resetForm();
    this.formSubmitted = false;
    this.formDirective.resetForm();
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
