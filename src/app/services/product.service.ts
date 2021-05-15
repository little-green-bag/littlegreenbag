import { DialogService } from '@services/shared/dialog/dialog.service';
import { NotificationsService } from './shared/notifications/notifications.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '@models/index';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private notificationsService: NotificationsService,
    private dialogService: DialogService
  ) {}

  getCollection(collection) {
    return this.firestore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((action) => {
            const data = action.payload.doc.data() as ProductModel;
            const id = action.payload.doc.id;
            const result = { id, ...data };
            return result;
          })
        )
      );
  }

  getProduct(id: string, collection: string) {
    return this.firestore.doc(`${collection}/${id}`);
  }

  createProduct(product: ProductModel, collection: string): void {
    this.firestore
      .collection(collection)
      .add(product)
      .catch((err) => console.log('error creating product', err));
    this.notificationsService.successAlert(
      `${product.name} successfully created`
    );
  }

  updateProduct(product: ProductModel, collection: string): void {
    this.dialogService
      .openDialog({ ...product, action: 'Update' })
      .afterClosed()
      .subscribe((res) => {
        if (res.event !== 'Cancel') {
          this.firestore
            .doc(`${collection}/${product.id}`)
            .update(res.data)
            .catch((err) => console.log('error updating product', err));
          this.notificationsService.successAlert(
            `${product.name} successfully updated`
          );
        }
      });
  }

  deleteProduct(product: ProductModel, collection: string): void {
    this.dialogService
      .openDialog({ action: 'Delete' })
      .afterClosed()
      .subscribe((res) => {
        if (res.event !== 'Cancel') {
          this.firestore
            .doc(`${collection}/${product.id}`)
            .delete()
            .catch((err) => console.log('error deleting that product', err));
          this.removeStorageRef(product.imageUrl);
          this.notificationsService.successAlert(
            `${product.name} successfully deleted`
          );
        }
      });
  }

  removeStorageRef(imgUrl: string): void {
    if (imgUrl) {
      const ref = this.storage.refFromURL(imgUrl);
      ref.delete();
    }
  }
}
