import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: AngularFirestore) {}

  addProduct(product: Product): Promise<DocumentReference<unknown>> {
    const productObject = { ...product };

    return this.firestore.collection('products').add(productObject);
  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  updateProduct(product: Product) {
    const productObject = { ...product };
    this.firestore.doc('products/' + product.id).update(productObject);
  }

  deleteProduct(productId: string) {
    this.firestore.doc('products/' + productId).delete();
  }

  searchProducts(product: Product) {
    /*  #A) one way of applying search query:
        In case when we have `single` where statement to search.
        this query will result list of employee matched with
        given employee.name parameter
    */
    // 👇 un-comment this code to use single-query👇
    // return this.firestore.collection(
    //   'Employees', ref => ref.where('name', '==', employee.name)).snapshotChanges();

    /* #B) second way of applying search query:
        In case when we have `multiple` where statement to search.
        this query will result list of employee matched with
        all given parameters:
        #1. Query for `multiple` where statement.
        #2. Query for range '>=' operators.
        #3. Query order by `ascending`.
        #4. Query order by `descending` by date or strings.
        #5. Apply limit to Query result.
        #6. Offset by a property, suppose we want employee whose
            name starts with `An` then apply startAt('An')
    */

    /*
      After applying these query you may face this error:
      "ERROR FirebaseError: The query requires an index. You can create it here: URL"
      You will get above error with an URL - Click over that URL - Login in Firebase
      and this will prompt to Create an Index which is required in Firebase 
      to apply queries to Database Collection.
    */
    return this.firestore
      .collection('products', (ref) => {
        // declare var `query` of type either `CollectionReference` or `Query`
        let query:
          | firebase.default.firestore.CollectionReference
          | firebase.default.firestore.Query = ref;

        // 👇 the below conditions will be applied to query
        // 👇 only when params have value in given `employee` object.

        if (product.name) {
          query = query.where('name', '==', product.name);
        }
        // where condition to match employee with given phone
        if (product.price) {
          query = query.where('price', '==', product.price);
        }
        return query;
      })
      .snapshotChanges();
  }
}
