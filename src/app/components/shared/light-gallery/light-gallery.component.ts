import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import { LightGallerySettings } from 'lightgallery/lg-settings';
import lightGallery from 'lightgallery';




@Component({
  selector: 'app-light-gallery',
  templateUrl: './light-gallery.component.html',
  styleUrls: ['./light-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightGalleryComponent implements OnInit, AfterViewInit {
  @Input() data;
  @ViewChild('lightgallery') lightgallery: any;
  display = false;
  settings: LightGallerySettings = {
    counter: false,
    mode: 'lg-slide',
    plugins: [lgThumbnail, lgZoom],
    easing: 'cubic-bezier(0.51, 0.92, 0.24, 1.15)',
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.lightgallery = lightGallery(this.lightgallery.nativeElement, this.settings);

    console.log('lg is ', this.lightgallery);
    console.log('data is ', this.data);
  }



  toggleDisplay(boo): void {
    this.display = boo;
  }


  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

}
