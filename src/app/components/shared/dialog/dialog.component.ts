import { OnInit, Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '@models/index';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryGroups, defaultImageSrc } from '@config/index';
import { updateProductCreateObject } from '@store/actions/create-product.actions';
import { map } from 'rxjs/operators';
import { ProductService } from '@services/product.service';
import { addProductImage } from '@store/actions/products.actions';
import { selectSelectedProduct } from '@store/selectors';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements AfterViewInit {
  @ViewChild('f') myNgForm;
  @ViewChild('inputRef') inputRef;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  @ViewChild('category') category;

  product$: Observable<ProductModel>;
  selectedProduct: Observable<ProductModel>;

  selectedFiles = [];
  files = [];
  images = [];
  productForm: FormGroup;
  currentImgSrc = "";
  formSubmitted = false;
  action: string;
  local_data: any;
  coverImageSrc = '';
  categoryGroups = CategoryGroups;
  selectedCategory = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private _fb: FormBuilder,
    private store: Store,
    private productService: ProductService,


  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.buildForm();
    this.product$ = this.store.select(selectSelectedProduct);
  }

  ngAfterViewInit() {
    console.log('this.local_data is ', this.local_data);
    console.log('this.productForm.value is ', this.productForm.value);
    console.log('this.productForm.value is ', this.productForm.value);

    // this.productForm.patchValue({ product: { category: this.local_data.category } })
    // this.store.dispatch(updateProductCreateObject(this.productForm.value))

    // const images = this.local_data.imageUrl;
    // 
    // this.images.push(images);
  }

  onComplete(e) {
    console.log('complete', e);
    if (e && e.url) {
      // this.images.push(e.url);
      // this.store.dispatch(addProductImage({}));
    }
  }

  updateObject(e) {
    console.log('e is ', e);
    // const form = this.productForm.value;
    // console.log('form now reads ', form);
    // this.store.dispatch(updateProductCreateObject(form));
  }

  getCategory() {
    const currentCat = this.local_data.category;
    let match = null;
    this.categoryGroups.forEach(group => {
      group.categories.filter(cat => {
        if (cat.value.toLocaleLowerCase().trim().includes(currentCat.toLocaleLowerCase().trim())) {
          console.log('match is ', cat);
          match = cat;
        }
      });
      if (match) {
        this.productForm.patchValue({ product: { category: match } });
      }
    })
  }

  fetchCategory(): string {
    let result = '';
    const searchString = this.local_data.category.toLocaleLowerCase().trim();
    CategoryGroups.forEach(group => {
      group.categories.forEach(cat => {
        const value1 = cat.value.toLocaleLowerCase().trim();

        const value2 = cat.viewValue.toLocaleLowerCase().trim();
        const fullValue = `${value1}${value2}`;
        console.log('fullValue is ', fullValue);

        const match = fullValue.search(searchString);
        if (match > -1) {
          result = cat.viewValue;
        }
      })
    })
    return result;
  }

  buildForm(): void {
    this.images = this.local_data.images ? this.local_data.images : [this.local_data.imageUrl];
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: [this.local_data.name, Validators.required],
        description: [this.local_data.description, Validators.required],
        price: [this.local_data.price, Validators.required],
        images: [[]],
        category: [this.fetchCategory(), Validators.required],
      }),
    });

    console.log('this.category is ', this.category);
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

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  onSubmit() {
    console.log('this.form is ', this.productForm);
    const cat = this.productForm.get('product.category')
    console.log('category is ', cat);
    const existsAlready = '';
    // this.productService.createProduct(this.productForm.value, `${cat}-TESTING`);
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onRemove(url) {
    console.log('url is ', url);
    // this.images = this.images.filter(i => i !== url);
    // this.productForm.setValue({ ...this.productForm.value, images: this.images });
    // this.store.dispatch(updateProductCreateObject(this.productForm.value))
  }
}
