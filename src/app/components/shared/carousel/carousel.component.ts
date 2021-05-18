import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { CarouselConfigModel } from '@models/index';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    loop: true,
    touch: true,
    velocity: 0.2,
  };

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  @Input() config: CarouselConfigModel;
  @Input() carouselItems;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('this.items ', this.carouselItems);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
