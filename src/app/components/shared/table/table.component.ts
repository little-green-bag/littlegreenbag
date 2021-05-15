import { DialogService } from '@services/shared/dialog/dialog.service';
import { ProductService } from '@services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
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
  constructor(
    private productService: ProductService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  delete(e) {
    this.productService.deleteProduct(e, 'products');
  }

  edit(obj): void {
    this.productService.updateProduct(obj, 'products');
  }
}
