import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct, selectSelectedProductImages } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { defaultImageSrc } from '@config/index';
interface Category {
  value: string,
  viewValue: string,
}
interface CategoryGroup {
  name: string;
  categories: Category[]
}

@Component({
  selector: 'app-product-create-component',
  templateUrl: './product-create-component.component.html',
  styleUrls: ['./product-create-component.component.scss'],
})
export class ProductCreateComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  selectedProduct: Observable<ProductModel>;
  selectedFiles = [];
  files = [];
  productForm: FormGroup;
  coverImageSrc = '';
  currentImgSrc = "";
  formSubmitted = false;
  categoryGroups: CategoryGroup[] = [
    {
      name: 'Glass Gallery',
      categories: [
        { value: 'rig-0', viewValue: 'Rig' },
        { value: 'pendants-1', viewValue: 'Pendants' },
        { value: 'dab-2', viewValue: 'Dab' },
        { value: 'tools-3', viewValue: 'Tools' }
      ]
    },
    {
      name: 'Accessories',
      categories: [
        { value: 'cleaning-0', viewValue: 'Cleaning' },
        { value: 'dab-mats-1', viewValue: 'Dab Mats' },
      ]
    },
    {
      name: 'Glass Essentials',
      categories: [
        { value: 'bangers-0', viewValue: 'Bangers' },
        { value: 'slupers-1', viewValue: 'Slupers' },
        { value: 'marbles-2', viewValue: 'Marbles' },
        { value: 'carb-caps-3', viewValue: 'Carb-caps' }
      ]
    },
  ];

  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private _notificationService: NotificationsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.selectedProduct = this.store.select(selectSelectedProduct);
    this.selectedProduct.pipe(map(
      res => {
        this.coverImageSrc = res.images.length ? res.images[0] : defaultImageSrc;
      }
    ))
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

  updateObject() {
    const form = this.productForm.value;
    this.store.dispatch(updateProductCreateObject(this.productForm.value));
  }

  reset() {
    this.productForm.reset();
    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
    this.currentImgSrc = this.coverImageSrc;
    this.myNgForm.resetForm();
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
}
