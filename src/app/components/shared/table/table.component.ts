import { RoutingService } from '@services/core/routing.service';
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
    'inspect',
    'image',
  ];

  constructor(
    private productService: ProductService,
    private routerService: RoutingService
  ) {}

  onRowClicked(r) {
    console.log('r is ', r);
  }

  delete(e) {
    this.productService.deleteProduct(e, 'products');
  }

  edit(obj): void {
    this.productService.updateProduct(obj, 'products');
  }

  inspect(e): void {
    this.routerService.go(`/product/${e.id}`);
  }
}
