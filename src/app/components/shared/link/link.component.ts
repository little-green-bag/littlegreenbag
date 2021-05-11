import { Component, Input } from '@angular/core';
import { LinkModel } from '@models/link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() linkConfig: LinkModel;
}
