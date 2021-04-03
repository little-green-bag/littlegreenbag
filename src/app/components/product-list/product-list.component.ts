import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product.model';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.map((action) => {
        const data = action.payload.doc.data() as Product;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  create(product: Product) {
    this.productService.createProduct(product);
  }

  update(product: Product) {
    this.productService.updateProduct(product);
  }

  delete(id: string) {
    this.productService.deleteProduct(id);
  }
}
