import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Store } from '@ngrx/store';
import { selectProducts } from '@selectors/index';
import { of, Observable } from 'rxjs';
import { ProductModel } from '@models/index';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  dataSource$: Observable<ProductModel[]>;

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    // interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2,
    slide: 1,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  }

  constructor(private cdr: ChangeDetectorRef, private store: Store) { }

  ngOnInit() {
    this.dataSource$ = this.store.select(selectProducts);
    this.dataSource$.subscribe(res => console.log('res is ', res));
  }

  ngAfterViewInit() {
    console.log('this.dataSource is ', this.dataSource$);
    console.log('this.carouselis ', this.myCarousel);
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    console.log('slide is ', slide);
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}