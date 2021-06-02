import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgHash from 'lightgallery/plugins/hash';
import lgComment from 'lightgallery/plugins/comment';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgPager from 'lightgallery/plugins/pager';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';
import lgVideo from 'lightgallery/plugins/video';
import lgMediumZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import lightGallery from 'lightgallery';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductModel } from '@models/product.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collections } from '@config/collections';



@Component({
  selector: 'app-light-gallery',
  templateUrl: './light-gallery.component.html',
  styleUrls: ['./light-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightGalleryComponent implements OnInit, AfterViewInit {
  @Input('data$') data$: Observable<any>;
  @ViewChild('lightgallery') lightgallery: any;
  setData$: BehaviorSubject<any> = new BehaviorSubject([]);
  // images = [];
  // display = false;
  settings: LightGallerySettings = {
    easing: 'cubic-bezier(0.51, 0.92, 0.24, 1.15)',
    speed: 500,
    plugins: [lgZoom],
    showZoomInOutIcons: true,
    actualSize: false,
    download: true,
    fullScreen: true,
    autoplay: false,
    // dynamicEl: this.setData$.value
  };

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.data$.pipe(map(res => {
      if (res.length) {
        const updated = res.map(product => {
          console.log('item', product);
          const storageRef = this.firestore.collection(Collections.STORE_PRODUCTS);
          const itemRef = storageRef.doc(`${product.id}`).ref;
          const data = itemRef.get().then(i => i.data());
          console.log('data is ', data);
        })
        // this.setData$.next(res);
        // res.forEach(item => {
        //   if (item.images && item.images[0]) {
        //     const imageString = item.images[0].url;
        //     this.images.push(imageString);
        //   }
        // })
      }
    })).subscribe();
    // this.lightgallery = lightGallery(this.lightgallery, this.settings);

  }

  ngAfterViewInit() {
    //   // this.lightgallery = lightGallery(document.getElementById('lightgallery'), this.settings);
  }

  // showSlideShow() {
  //   this.lightgallery = lightGallery(document.getElementById('lightgallery'), {

  //   });
  // }

  // toggleDisplay(boo): void {
  //   this.display = boo;
  // }

  // onBeforeSlide = (detail: BeforeSlideDetail): void => {
  //   const { index, prevIndex } = detail;
  //   console.log(index, prevIndex);
  // }

  // onGalleryInit(e) {
  //   console.log('initialised with ', e);
  // }

  // onBeforeOpen() { }
  // onAfterOpen() { }
  // destroy() {
  //   this.lightgallery.destroy(true);
  // }
}
