import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '@services/shared/sidenav.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;
  constructor(private sidenavService: SidenavService) {}
  ngAfterViewInit() {
    this.sidenavService.setDrawer(this.drawer);
  }
}
