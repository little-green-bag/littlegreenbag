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
    console.log('this drawer is ', this.drawer);
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
