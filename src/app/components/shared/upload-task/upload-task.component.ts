import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFirestoreCollection, } from '@angular/fire/firestore';
import { startSpinner, stopSpinner } from '@store/actions/spinner.actions';
import firebase from 'firebase';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Output() complete = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  testCollection: AngularFirestoreCollection<any>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  currentPercent: any;
  constructor(private storage: AngularFireStorage, private store: Store
  ) { }

  ngOnInit() {
    this.startUpload();
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

  startUpload() {
    var storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images');
    const imageRef = imagesRef.child(`${this.cleanFileName(this.file.name)}`);
    const path = imageRef.fullPath;
    const finalRef = this.storage.ref(path);
    imageRef.getDownloadURL().then(url => {
      console.log('it exists');
      const createdImage = { name: this.file.name, url };
      this.downloadURL = url;
      this.complete.emit(createdImage);
    }).catch(async err => {
      console.log('err is ', err);
      switch (err.code) {
        case 'storage/object-not-found':
          this.store.dispatch(startSpinner());
          // The main task
          this.task = this.storage.upload(path, this.file);
          // Progress monitoring
          this.percentage = this.task.percentageChanges();
          this.snapshot = this.task.snapshotChanges().pipe(
            finalize(async () => {
              this.downloadURL = await finalRef.getDownloadURL().toPromise();
              const createdImage = { name: this.file.name, url: this.downloadURL };
              this.complete.emit(createdImage)
              this.store.dispatch(stopSpinner());
            }),
          );
      }
    });
  };
}
