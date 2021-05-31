import { DialogService } from '@services/shared/dialog/dialog.service';
import { NotificationsService } from './shared/notifications/notifications.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '@models/index';
import { Collections } from '@config/index';
import { Store } from '@ngrx/store';
import { selectUserData } from '@store/selectors';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private notificationsService: NotificationsService,
    private dialogService: DialogService,
    private store: Store
  ) { }

  getProductData(action) {
    const data = action.payload.doc.data() as ProductModel;
    const id = action.payload.doc.id;
    const result = { id, ...data };
    return result;
  }

  getProducts() {
    return this.firestore.collection(Collections.PRODUCTS).snapshotChanges();
  }

  getProduct(id: string = '') {
    return this.firestore
      .doc(`${Collections.PRODUCTS}/${id}`)
      .snapshotChanges();
  }

  setProduct(product: ProductModel, collection: string): Promise<any> {
    console.log('product is ', product);
    let user;
    const { serverTimestamp } = firebase.firestore.FieldValue;
    this.store.select(selectUserData).subscribe(res => user = res);
    const productToSet = { ...product, uid: user.id, createdAt: serverTimestamp() };
    return this.firestore.collection(collection).doc(product.name).set(productToSet, { merge: true }).then(() => {
      this.notificationsService.successAlert('Document successfully written!')
    })
      .catch((error) => {
        this.notificationsService.warningAlert('Error writing document: ", error')
      });
  }

  deleteProduct(product: ProductModel, collection: string): void {
    // this.dialogService
    //   .openDialog({ action: 'Delete' })
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res.event !== 'Cancel') {
    //       this.firestore
    //         .doc(`${collection}/${product.id}`)
    //         .delete()
    //         .catch((err) => console.log('error deleting that product', err));
    //       this.removeStorageRef(product.imageUrl);
    //       this.notificationsService.successAlert(
    //         `${product.name} successfully deleted`
    //       );
    //     }
    //   });
  }

  removeStorageRef(imgUrl: string): void {
    if (imgUrl) {
      const ref = this.storage.refFromURL(imgUrl);
      ref.delete();
    }
  }
}
