import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'monorepo-turbo-nest-angular-boilerplate';
  public showHeader = false;
  public showSidebar = false;
  public showFooter = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader =
          this.activatedRoute.firstChild?.snapshot.data.showHeader !== false;
        this.showSidebar =
          this.activatedRoute.firstChild?.snapshot.data.showSidebar !== false;
        this.showFooter =
          this.activatedRoute.firstChild?.snapshot.data.showFooter !== false;
      }
    });
  }
}
