import { Component, inject, OnInit, signal } from '@angular/core';
import { IBreadcrumbsConfiguration } from '@interfaces/breadcrumbs.interface';
import { INavigationConfiguration } from '@interfaces/module-navigation.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ParamsService } from '@services/params.service';

@Component({
  selector: 'app-administration',
  standalone: false,
  template: `
    <div class="administration-main_container">
      <h1 class="administration-title">{{ 'ADMINISTRATION.TITLE' | translate }}</h1>
      <hr class="administration-separator" />
      <div class="administration-body">
        <app-module-navigation [navigationConfig]="navigationConfig()" />
        <div>
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .administration-main_container {
        .administration-title {
          font-size: 32px;
          font-weight: 900;
          color: var(--primary-color-200);
        }

        .administration-separator {
          color: #c7c7c7;
          margin: 10px 0px 20px 0px;
        }

        .administration-body {
          display: grid;
          height: calc(100dvh - 185px);
          overflow: auto;
          gap: 55px;
          grid-template-columns: 194px auto;
        }
      }
    `,
  ],
})
export class AdministrationComponent implements OnInit {
  private readonly paramsService = inject(ParamsService);
  protected navigationConfig = signal<INavigationConfiguration[]>([]);

  ngOnInit(): void {
    this.getNavigationConfig();
  }

  private getNavigationConfig() {
    this.paramsService.getAdministrationNavigation().subscribe(config => {
      this.navigationConfig.set(config.Configuration);
    });
  }
}
