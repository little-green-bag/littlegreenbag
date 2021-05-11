import { Component, OnInit, Input } from '@angular/core';
import { LinkModel } from '../../../models/link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() linkConfig: LinkModel;

  constructor() {}

  ngOnInit(): void {
    console.log('input is ', this.linkConfig);
  }
}
