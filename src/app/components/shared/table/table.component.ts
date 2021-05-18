import { ProductService } from '@services/product.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data;
  displayedColumns: string[] = [
    'position',
    'name',
    'price',
    'description',
    'productGroup',
    'edit',
    'delete',
    'image',
  ];

  constructor(private productService: ProductService) {}

  onRowClicked(r) {
    console.log('r is ', r);
  }

  delete(e) {
    this.productService.deleteProduct(e, 'products');
  }

  edit(obj): void {
    this.productService.updateProduct(obj, 'products');
  }
}
