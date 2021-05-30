import { RoutingService } from '@services/core/routing.service';
import { ProductService } from '@services/product.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { DialogService } from '@services/shared/dialog/dialog.service';
import { ProductModel } from '@models/product.model';

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
    // 'delete',
    'inspect',
    'image',
  ];

  constructor(
    private productService: ProductService,
    private routerService: RoutingService,
    private dialogService: DialogService
  ) { }

  onRowClicked(r) {
    console.log('r is ', r);
  }

  delete(e) {
    // this.productService.deleteProduct(e, 'products');
  }

  edit(product: ProductModel): void {
    this.dialogService.openDialog({ ...product, action: 'Update' })
      .afterClosed()
      .subscribe((res) => {
        console.log('updated res is ', res);
        if (res.event !== 'Cancel') {
          console.log('should send to product service now', res);
          // this.productService.updateProduct(res.data, 'edited-products');
        }
      });
  }

  inspect(e): void {
    this.routerService.go(`/product/${e.id}`);
  }
}
