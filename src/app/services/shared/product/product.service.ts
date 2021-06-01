import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '@models/index';
import { Collections } from '@config/index';
import { Store } from '@ngrx/store';
import { selectUserData } from '@store/selectors';
import firebase from 'firebase';
import { DialogService } from '../dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private notificationsService: NotificationsService,
    private dialogService: DialogService
  ) { }

  getProductData(action) {
    const data = action.payload.doc.data() as ProductModel;
    const id = action.payload.doc.id;
    let updated = { ...data, id };
    if (updated.imageUrl) {
      updated.images.push({ name: '', url: updated.imageUrl });
      delete updated.imageUrl;
    }
    return updated;
  }

  getProducts() {
    return this.firestore.collection(Collections.TEST_PRODUCTS).snapshotChanges();
  }

  getProduct(id: string = '') {
    return this.firestore
      .doc(`${Collections.PRODUCTS}/${id}`)
      .snapshotChanges();
  }

  setProduct(product: ProductModel, collection: string): Promise<any> {
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const productToSet = { ...product, createdAt: serverTimestamp() };
    console.log('productToSet is ', productToSet);
    return this.firestore.collection(collection).doc(product.name).set(productToSet, { merge: true }).then(() => {
      this.notificationsService.successAlert('Document successfully written!')
    })
      .catch((error) => {
        this.notificationsService.warningAlert('Error writing document: ", error')
      });
  }

  deleteProduct(product: ProductModel): void {
    this.dialogService
      .openConfirmationDialog({ action: 'Delete', product })
      .afterClosed()
      .subscribe((res) => {
        const { event } = res.type;
        if (event === 'Submit') {
          const storageRef = this.firestore.collection(Collections.TEST_PRODUCTS);
          const itemRef = storageRef.doc(`${product.id}`).ref;
          console.log('itemRef is ', itemRef.id);

          itemRef.delete().then(res => {
            this.notificationsService.successAlert(
              `${product.name} successfully deleted`
            );
          }).catch(err => this.notificationsService.warningAlert('error deleting that product', err))
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
