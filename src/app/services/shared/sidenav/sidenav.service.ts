import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  constructor(private router: Router) { }

  private drawer: MatDrawer;

  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.resetDrawer();
      }
    });

    this.router.events.pipe(
      filter((e: any) => e instanceof RouterEvent),
      map(e => console.log('event is ', e))
    )

    // filter((e: Event): e is RouterEvent => e instanceof RouterEvent)

    // .subscribe((e: RouterEvent) => {
    //   console.log(e.id, e.url);
    // });
  }

  setDrawer(drawer: MatDrawer) {
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
