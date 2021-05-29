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
    console.log('local_data is ', this.local_data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.buildForm();
    this.product$ = this.store.select(selectSelectedProduct);
  }

  ngAfterViewInit() {
    const images = this.local_data.imageUrl;
    // this.images.push(images);
  }

  onComplete(e) {
    console.log('complete', e);
    if (e && e.url) {
      // this.images.push(e.url);
      this.store.dispatch(addProductImage(e.url));
    }
  }

  updateObject(e) {
    // const form = this.productForm.value;
    // console.log('form now reads ', form);
    // this.store.dispatch(updateProductCreateObject(form));
  }

  buildForm(): void {
    this.images = this.local_data.images ? this.local_data.images : [this.local_data.imageUrl];
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: [this.local_data.name, Validators.required],
        description: [this.local_data.description, Validators.required],
        price: [this.local_data.price, Validators.required],
        images: [this.images],
        category: [this.local_data.category, Validators.required],
      }),
    });
    this.store.dispatch(updateProductCreateObject(this.productForm.value))
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
