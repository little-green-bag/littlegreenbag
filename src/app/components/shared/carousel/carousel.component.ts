import { ProductService } from '@services/product.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { CarouselConfigModel, ProductModel } from '@models/index';
import { map } from 'rxjs/operators';

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
  carouselItems: ProductModel[] = [
    {
      imageUrl: '../../../../assets/banger-one.png',
      id: '',
      name: '',
      description: '',
      price: 1,
      category: '',
    },
    {
      imageUrl: '../../../../assets/banger-two.png',
      id: '',
      name: '',
      description: '',
      price: 1,
      category: '',
    },
    {
      imageUrl: '../../../../assets/banger-three.png',
      id: '',
      name: '',
      description: '',
      price: 1,
      category: '',
    },
    {
      imageUrl: '../../../../assets/banger-four.png',
      id: '',
      name: '',
      description: '',
      price: 1,
      category: '',
    },
  ];

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  @Input() config: CarouselConfigModel;
  @Input() items;
  constructor(
    private cdr: ChangeDetectorRef,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // this.productService.getProducts('products').subscribe((data) => {
    //   this.carouselItems = data.map((action) => {
    //     const data = action.payload.doc.data() as Product;
    //     const id = action.payload.doc.id;
    //     console.log('data.name is ', data.name);
    //     return returnItem;
    //   });
    // });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
