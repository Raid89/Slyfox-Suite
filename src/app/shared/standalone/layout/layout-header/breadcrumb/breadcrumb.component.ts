import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreadcrumbElement, IBreadcrumb } from '@interfaces/breadcrumbs.interface';
import { filter, lastValueFrom } from 'rxjs';
import { SlyfoxUiIconComponent } from 'slyfox-ui';
import { CommonModule } from '@angular/common';
import { ParamsService } from '@services/params.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, SlyfoxUiIconComponent, RouterModule, TranslateModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  private paramsService = inject(ParamsService);
  protected breadcrumbConfiguration = this.paramsService.getBreadcrumbsConfig();
  protected breadcrumbList = signal<BreadcrumbElement[]>([]);

  constructor( private router: Router ) {}

  ngOnInit(): void {
    this.getBreadcrumbList();
    this.observerNavigation();
  }

  observerNavigation() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlArray = event.urlAfterRedirects.split('/').filter(Boolean);
        const lastUrl = urlArray.at(-1) || ''
        this.getBreadcrumbList(lastUrl);

      });
  }

  async getBreadcrumbList(lastUrl?: string) {
    if(!lastUrl) {
      const urlArray = this.router.url.split('/').filter(Boolean);
      lastUrl = urlArray.at(-1) || ''
    }

    const breadcrumbMatch = (await lastValueFrom(this.breadcrumbConfiguration)).Configuration.find((a) => a.path === lastUrl);

    if(breadcrumbMatch) this.breadcrumbList.set(breadcrumbMatch.breadcrumbs);
    this.setSelectedPath(lastUrl);
  }

  setSelectedPath(lastUrl: string) {
    this.breadcrumbList().forEach((url, index) => {
      if(url.path === lastUrl) this.breadcrumbList()[index].selected = true
      else this.breadcrumbList()[index].selected = false
    })
  }

}
