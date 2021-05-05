import { MatDrawer } from '@angular/material/sidenav';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'littlegreenbag';

  @ViewChild('drawer') public drawer: MatDrawer;
  constructor(private sidenavService: SidenavService) {}
  ngAfterViewInit() {
    this.sidenavService.setDrawer(this.drawer);
  }
}
