import auth from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserModel } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: BehaviorSubject<UserModel> = new BehaviorSubject({});
  public readonly user: Observable<UserModel> = this._user.asObservable();

  user$: Observable<UserModel>;
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afStore
            .doc<UserModel>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUserStatus() {
    return this.user$;
  }

  async googleSignIn() {
    const provider = new auth.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: UserModel) {
    const userRef: AngularFirestoreDocument<UserModel> = this.afStore.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
