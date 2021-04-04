import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '@models/product.model';

class ProductNames {
  static readonly PRODUCTS: 'products';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts() {
    return this.firestore.collection(ProductNames.PRODUCTS).snapshotChanges();
  }

  createProduct(product: Product) {
    return this.firestore.collection(ProductNames.PRODUCTS).add(product);
  }

  updateProduct(product: Product) {
    delete product.id;
    this.firestore
      .doc(`${ProductNames.PRODUCTS}/${product.id}`)
      .update(product);
  }

  deleteProduct(productId: string) {
    this.firestore.doc(`${ProductNames.PRODUCTS}/${productId}`).delete();
  }
}
