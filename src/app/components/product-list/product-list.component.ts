import { map } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { NotificationsService } from '@services/shared/notifications/notifications.service';
import { ProductModel } from '@models/index';
import { Observable } from 'rxjs';

interface ProductGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Observable<ProductModel[]>;
  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'delete',
    'image',
  ];

  constructor(
    private productService: ProductService,
    private _notificationService: NotificationsService
  ) {}

  async ngAfterViewInit() {
    if (this.products) {
      this.products.subscribe((products) => {
        console.log('products are ', products);
      });
    }
  }

  ngOnInit(): void {
    // this.products = this.productService.getProducts('products').pipe(
    //   map((actions) =>
    //     actions.map((action) => {
    //       const data = action.payload.doc.data() as ProductModel;
    //       const id = action.payload.doc.id;
    //       const result = { id, ...data };
    //       localStorage.setItem('products', JSON.stringify(result));
    //       this._notificationService.openSnackBar(
    //         'Products successfully fetched',
    //         'PRODUCTS',
    //         'red-snackbar'
    //       );
    //       return result;
    //     })
    //   )
    // );
  }

  retrieveImage(p: ProductModel) {
    // const words = p.image_url.split('-');
    // const type = words[0];
    // const item = words[1];
    // console.log('words are ', words);
    return '';
    // return `../../assets/${type}/${item}`;
  }
}
