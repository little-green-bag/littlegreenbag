import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

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

  deleteProduct(product: ProductModel, collection) {
    this.firestore
      .doc(`${collection}/${product.id}`)
      .delete()
      .catch((err) => console.log('error deleting that product'));
    const ref = this.storage.refFromURL(product.imageUrl);
    ref.delete();
  }
}
