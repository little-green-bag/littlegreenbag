import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@services/shared/sidenav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements AfterViewInit {
  // @ViewChild('sidenav') public sidenav: MatDrawer;
  opened: boolean;

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit() {
    // this.sidenavService.setDrawer(this.sidenav);
  }
}
