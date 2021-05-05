import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Directive({
  selector: '[appResponsiveSidenav]',
})
export class ResponsiveSidenavDirective {
  constructor(
    private breakpoint: BreakpointObserver,
    private sidenav: MatSidenav
  ) {}
}
