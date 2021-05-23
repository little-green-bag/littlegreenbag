import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavService } from './services/shared/sidenav/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectLoading } from '@store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;

  loading$: Observable<boolean>;
  opened: boolean;

  constructor(private sidenavService: SidenavService, private store: Store) {
  }

  ngOnViewInit() {
    this.loading$ = this.store.select(selectLoading);
  }

  ngAfterViewInit() {
    this.sidenavService.setDrawer(this.drawer);
  }

}
