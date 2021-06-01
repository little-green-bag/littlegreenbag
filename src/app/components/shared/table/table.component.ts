import { RoutingService } from '@services/core/routing/routing.service';
import { ProductService } from '@services/shared/product/product.service';
import { Component, Input } from '@angular/core';
import { DialogService } from '@services/shared/dialog/dialog.service';
import { ProductModel } from '@models/product.model';
import { Collections } from '@config/collections';

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
    // 'edit',
    'delete',
    // 'inspect',
  ];

  constructor(
    private productService: ProductService,
    private routerService: RoutingService,
    private dialogService: DialogService
  ) { }

  onRowClicked(r) {
    // console.log('r is ', r);
  }

  delete(product) {
    this.productService.deleteProduct(product);
  }

  edit(product: ProductModel): void {
    this.dialogService.openDialog({ ...product, action: 'Update' })
      .afterClosed()
      .subscribe((res) => {
        console.log('updated res is ', res);
        const { event } = res.type;
        if (event === 'Submit') {
          this.productService.setProduct(res.value, Collections.PRODUCTS);
        }
      });
  }

  inspect(e): void {
    this.routerService.go(`/product/${e.id}`);
  }
}
