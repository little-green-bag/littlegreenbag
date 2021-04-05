import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(collection) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  createProduct(product: Product, collection) {
    return this.firestore.collection(collection).add(product);
  }

  updateProduct(product: Product, collection) {
    delete product.id;
    this.firestore.doc(`${collection}/${product.id}`).update(product);
  }

  deleteProduct(productId: string, collection) {
    this.firestore.doc(`${collection}/${productId}`).delete();
  }
}
