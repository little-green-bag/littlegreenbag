import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  createProduct(product: ProductModel, collection) {
    return this.firestore.collection(collection).add(product);
  }

  updateProduct(product: ProductModel, collection) {
    delete product.id;
    this.firestore.doc(`${collection}/${product.id}`).update(product);
  }

  deleteProduct(productId: string, collection) {
    this.firestore.doc(`${collection}/${productId}`).delete();
  }
}
