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
    private storage: AngularFireStorage
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

  getProduct(id, collection) {
    return this.firestore.doc(`${collection}/${id}`);
  }

  createProduct(product: ProductModel, collection) {
    return this.firestore.collection(collection).add(product);
  }

  updateProduct(product: ProductModel, collection) {
    this.firestore.doc(`${collection}/${product.id}`).update(product);
  }

  deleteProduct(product: ProductModel, collection) {
    console.log(`deleting ${collection}/${product.id}`);
    this.firestore
      .doc(`${collection}/${product.id}`)
      .delete()
      .catch((err) => console.log('error deleting that product'));

    // this.removeStorageRef(product.imageUrl);
  }

  removeStorageRef(imgUrl): void {
    const ref = this.storage.refFromURL(imgUrl);
    ref.delete();
  }
}
