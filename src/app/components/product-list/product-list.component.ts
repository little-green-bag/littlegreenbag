import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@models/product.model';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productForm: FormGroup;
  formValid: false;

  constructor(
    private productService: ProductService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.map((action) => {
        const data = action.payload.doc.data() as Product;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    this.buildForm();
  }

  buildForm() {
    this.productForm = this._fb.group({
      product: this._fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        image_url: [''],
      }),
    });
  }

  onSubmit(f) {
    this.create(f.product);
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
