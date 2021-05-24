import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private drawer: MatDrawer;
  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.resetDrawer();
      }
    });
  }

  setDrawer(drawer: MatDrawer) {
    console.log('setting drawer')
    this.drawer = drawer;
  }

  resetDrawer(): void {
    console.log('this.resetting');
    this.drawer.close();
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
