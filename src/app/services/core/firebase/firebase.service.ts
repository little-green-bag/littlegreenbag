import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  event: any[];
  items;

  constructor(public db: AngularFireDatabase) {
    // Example
    // let restaurants = this.db.list('/path');
    this.items = this.db.list('/events');
  }
}
