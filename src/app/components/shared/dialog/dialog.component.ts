import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '@models/index';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryGroups } from '@config/index';
import { resetProductCreateObject, setProductCreateObject, updateProductCreateObject } from '@store/actions/create-product.actions';
import { addProductImage, removeProductImage } from '@store/actions/products.actions';
import { selectSelectedProduct } from '@store/selectors';
import { NotificationsService } from '@services/shared/notifications/notifications.service';

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
  selectedFiles = [];
  files = [];
  productForm: FormGroup;
  currentImgSrc = "";
  formSubmitted = false;
  action = "";
  local_data: any = {};
  coverImageSrc = '';
  categoryGroups = CategoryGroups;
  selectedCategory = '';
  currentImages = [];
  createdImages = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private _fb: FormBuilder,
    private store: Store,
    private notificationService: NotificationsService

  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.fetchImages();
    this.fetchCategory();
    this.buildForm();
    this.product$ = this.store.select(selectSelectedProduct);
  }

  ngAfterViewInit() {
    this.store.dispatch(setProductCreateObject(this.local_data))
    console.log('local_data is ', this.local_data);
  }

  fetchImages() {
    let result = [];
    result = this.local_data.images.length ? [...this.local_data.images] : this.local_data.imageUrl ? [{ name: '', url: this.local_data.imageUrl }] : [];
    this.currentImages = result;
  }

  fetchCategory(): void {
    const searchString = this.local_data.category.toLocaleLowerCase().trim();
    let result = '';
    CategoryGroups.forEach(group => {
      group.categories.forEach(cat => {
        const value1 = cat.value.toLocaleLowerCase().trim();
        const value2 = cat.viewValue.toLocaleLowerCase().trim();
        const fullValue = `${value1}${value2}`;
        const match = fullValue.search(searchString);
        if (match > -1) {
          result = cat.viewValue;
        }
      })
    });
    this.selectedCategory = result;
  }

  buildForm(): void {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: [this.local_data.name, Validators.required],
        description: [this.local_data.description, Validators.required],
        price: [this.local_data.price, Validators.required],
        images: [this.currentImages],
        category: [this.local_data.category, Validators.required],
        stockCount: [this.local_data.stockCount, Validators.required],
      }),
    });
  }

  updateObject(key, value): void {
    this.store.dispatch(updateProductCreateObject({ key, value }));
  }

  onComplete(image) {
    this.store.dispatch(addProductImage(image));
    this.selectedFiles = this.selectedFiles.filter(f => f.name !== image.name);
    const updatedImages = [...this.currentImages, image];
    this.productForm.patchValue({ product: { images: updatedImages } });
    this.currentImages = updatedImages;
  }

  onDelete(image) {
    this.store.dispatch(removeProductImage(image));
    this.currentImages = this.currentImages.filter(i => {
      return i.name !== image.name;
    })
    this.productForm.patchValue({ product: { images: this.currentImages } })
  }

  onFilesSelected(event: any) {
    const currentItems = [...this.selectedFiles];
    let newItems = [...event.target.files];

    newItems = newItems.filter(i => {
      const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      return i && acceptedImageTypes.includes(i['type']);
    })

    if (!newItems.length) {
      this.notificationService.warningAlert('None of these images are useable. .jpg, jpeg, or png pleaze');
    } else {
      if (!currentItems.length) {
        this.selectedFiles = newItems;
      } else {
        currentItems.forEach(cI => {
          const match = newItems.filter(nI => nI.name.toLowerCase().trim() === cI.name.toLowerCase().trim());
          if (match.length) {
            this.notificationService.warningAlert(`${match[0].name} is already loaded here`);
            newItems = newItems.filter(i => i.name.toLowerCase().trim() !== match[0].name.toLowerCase().trim());
          }
        });
        const allFiles = [...currentItems, ...newItems];
        this.selectedFiles = allFiles;
      }
    }
  }

  onSubmit() {
    const updatedObject = { ...this.local_data, ...this.productForm.value.product };
    console.log('updatedObject is ', updatedObject);
    this.closeDialog({ type: { event: 'Submit' }, value: updatedObject });
  }

  onCancel() {
    this.closeDialog({ type: { event: 'Cancel' }, value: null });
  }

  closeDialog({ type, value }) {
    this.store.dispatch(resetProductCreateObject());
    this.dialogRef.close({ type, value });
  }


}
