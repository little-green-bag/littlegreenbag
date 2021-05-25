import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { selectSelectedProduct, selectSelectedProductImages } from '@store/selectors';
import { startSpinner, stopSpinner } from '@actions/spinner.actions';
import { updateProductCreateObject } from '@actions/create-product.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  images: Observable<any>;
  selectedFiles = [];
  files = [];
  productForm: FormGroup;
  defaultImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/littlegreenbag-ecb99.appspot.com/o/products-0%2Fclick-here-to-upload_1620928912575?alt=media&token=d974ff59-7007-4ce7-97ac-feac006c4ad6';
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
    const { name, description, price, category } = product;
    const filePath = `${product.category}/${name
      .split('.')
      .slice(0, -1)
      .join('.')}_${new Date().getTime()}`;
    const result = this.store.select(selectSelectedProduct).pipe(
      map(res => {
        return {
          ...res,
          name, description, price, category
        }
      })
    );
    result.subscribe(res => {
      // this.productService.createProduct(product, 'products');
      //         this._notificationService.openSnackBar(
      //           'Product successfully created',
      //           'PRODUCTS',
      //           'green-snackbar'
      //         );
      //         this.resetForm();
    });


  }

  updateObject() {
    const form = this.productForm.value;
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
