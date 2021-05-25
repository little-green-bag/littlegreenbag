import { Component, OnInit, Input } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize, catchError, tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addProductImage } from '@store/actions/products.actions';
import { startSpinner, stopSpinner } from '@store/actions/spinner.actions';
import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  testCollection: AngularFirestoreCollection<any>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  currentPercent: any;
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private db: AngularFireDatabase, private store: Store, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    // The storage path
    const path = `test/${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);
    const fileName = this.cleanFileName(this.file.name);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        await this.store.dispatch(addProductImage({ url: this.downloadURL }));
        // this.db.collection('files').add({ downloadURL: this.downloadURL, path });
      }),
    );
  }

  cleanFileName(s): string {
    let strippedResult = s;
    strippedResult = strippedResult.replace('.jpg', '');
    strippedResult = strippedResult.replace('.png', '');
    strippedResult = strippedResult.replace('.jpeg', '');
    return strippedResult;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  // async startUpload() {
  //   this.store.dispatch(startSpinner());

  //   // The storage path
  //   const path = `test/${this.file.name}`;

  //   // Reference to storage bucket
  //   const ref = this.storage.ref(path);
  //   const fileName = this.file.name.replace('.jpg', '');
  //   this.db.database.ref(`test`).child(fileName).once(`value`, snapshot => {
  //     if (!snapshot.exists()) {
  //       this.task = this.storage.upload(path, this.file);
  //       this.percentage = this.task.percentageChanges();
  //       this.percentage.subscribe(res => this.currentPercent = res);
  //       this.snapshot = this.task.snapshotChanges().pipe(
  //         // The file's download URL
  //         finalize(async () => {
  //           const url = await ref.getDownloadURL().toPromise();
  //           await this.store.dispatch(addProductImage({ url }));
  //           this.store.dispatch(stopSpinner());
  //         }),
  //         catchError(err => of(console.log('error 3 is ', err)))
  //       )
  //     } else {
  //       console.log(`${this.file.name} DOES exists in the database.`);
  //       this.notificationService.warningAlert('This image already exists in the database');
  //     }
  //   }).catch(err => {
  //     console.log('err is ', err);
  //   });




  // }

  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }

}