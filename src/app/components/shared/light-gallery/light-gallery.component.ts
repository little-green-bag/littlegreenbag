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




@Component({
  selector: 'app-light-gallery',
  templateUrl: './light-gallery.component.html',
  styleUrls: ['./light-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightGalleryComponent implements OnInit, AfterViewInit {
  @Input('data$') data$: Observable<any>;
  setData$: BehaviorSubject<any> = new BehaviorSubject([]);
  display = false;
  settings: LightGallerySettings = {
    easing: 'cubic-bezier(0.51, 0.92, 0.24, 1.15)',
    speed: 500,
    plugins: [lgZoom],
    showZoomInOutIcons: true,
    actualSize: false,


  };

  constructor() { }

  ngOnInit(): void {
    this.data$.pipe(map(res => {
      console.log('res is ', res);
      if (res.length) {
        this.setData$.next(res);
        console.log('this.setData is ', this.setData$.value);
      }
    })).subscribe();
  }

  ngAfterViewInit() {
  }

  toggleDisplay(boo): void {
    this.display = boo;
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  }

  onGalleryInit(e) {
    console.log('initialised with ', e);
  }

  onBeforeOpen() { }
  onAfterOpen() { }
}
