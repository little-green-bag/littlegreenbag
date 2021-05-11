import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/shared/sidenav/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'littlegreenbag';
  opened: boolean = true;
  showFiller = false;

  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(private sidenavService: SidenavService, private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.resetSideNav();
      }
    });
  }

  ngAfterViewInit() {
    this.sidenavService.setDrawer(this.drawer);
  }

  resetSideNav() {
    this.sidenavService.resetDrawer();
  }
}
