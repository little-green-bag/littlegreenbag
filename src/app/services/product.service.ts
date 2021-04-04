import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  ProductNames = 'products';

  constructor(private firestore: AngularFirestore) {}

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection(this.ProductNames).add(product);
  }

  updateProduct(product: Product) {
    delete product.id;
    this.firestore.doc(`${this.ProductNames}/${product.id}`).update(product);
  }

  deleteProduct(productId: string) {
    this.firestore.doc(`${this.ProductNames}/${productId}`).delete();
  }
}
