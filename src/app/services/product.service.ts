import { AngularFireDatabase } from 'angularfire2/database';
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

  getProduct(id: string) {
    return this.firestore.doc(id);
  }

  createProduct(product: ProductModel, collection) {
    console.log('product is ', product);
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
