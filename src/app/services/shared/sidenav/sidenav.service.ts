import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor() {}

  private drawer: MatDrawer;

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  resetDrawer(): void {
    this.drawer.close();
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
