import { Component, OnInit } from '@angular/core';
export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
