import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AngularFirestoreCollection, } from '@angular/fire/firestore';
import { startSpinner, stopSpinner } from '@store/actions/spinner.actions';
import firebase from 'firebase';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { cleanFileName } from '../../../tools/string.functions';
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit, OnDestroy {
  @Input() file: File;
  @Output() complete = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  testCollection: AngularFirestoreCollection<any>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  snapSubscription: Subscription;
  downloadURL: string;
  currentPercent: any;
  constructor(private storage: AngularFireStorage, private store: Store
  ) { }

  ngOnInit() {
    this.startUpload();
  }



  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  uploadTask(path) {
    this.store.dispatch(startSpinner());
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
  }

  reset() {
    this.percentage = null;
    this.snapshot = null;
    this.store.dispatch(stopSpinner());
  }

  startUpload() {
    var storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child('images');
    const imageRef = imagesRef.child(`${this.file.name}`);
    const path = imageRef.fullPath;

    imageRef.getDownloadURL().then(url => {
      this.downloadURL = url;
      const result = { name: cleanFileName(this.file.name), url };
      this.complete.emit(result)
      this.reset();
    }).catch(err => {
      this.uploadTask(path);
      this.snapshot.subscribe((res: UploadTaskSnapshot) => {
        if (res.state === 'success') {
          imageRef.getDownloadURL().then(url => {
            this.downloadURL = url;
            const result = { name: cleanFileName(this.file.name), url };
            this.complete.emit(result)
            this.reset();
          }).catch(err => {
            console.log('still a problem', err);
          });
        }
      })
    });

  };

  ngOnDestroy() {
    this.reset();
  }
}
