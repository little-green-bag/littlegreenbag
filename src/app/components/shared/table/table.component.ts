import { RoutingService } from '@services/core/routing/routing.service';
import { ProductService } from '@services/shared/product/product.service';
import { Component, Input } from '@angular/core';
import { ProductModel } from '@models/product.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data;
  displayedColumns: string[] = [
    // 'position',
    'name',
    'price',
    'description',
    'productGroup',
    'edit',
    'delete',
    // 'inspect',
  ];

  constructor(
    private productService: ProductService,
    private routerService: RoutingService,
  ) { }

  onRowClicked(r) {
  }

  delete(product) {
    this.productService.deleteProduct(product);
  }

  edit(product: ProductModel): void {
    this.productService.editProduct(product);
  }

  inspect(e): void {
    this.routerService.go(`/product/${e.id}`);
  }
}
