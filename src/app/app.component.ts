import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/shared/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';

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

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit() {
    this.sidenavService.setDrawer(this.drawer);
  }
}
