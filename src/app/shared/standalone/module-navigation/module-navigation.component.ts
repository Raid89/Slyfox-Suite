import { Component, effect, inject, input, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { INavigationConfiguration } from '@interfaces/module-navigation.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ParamsService } from '@services/params.service';
import { filter, Subscription } from 'rxjs';
import { SlyfoxUiIconComponent } from 'slyfox-ui';
@Component({
  selector: 'app-module-navigation',
  imports: [RouterModule, SlyfoxUiIconComponent, TranslateModule],
  templateUrl: './module-navigation.component.html',
  styleUrl: './module-navigation.component.scss'
})
export class ModuleNavigationComponent {
  private router = inject(Router);
  private routerSubscription!: Subscription;

  public navigationConfig = input<INavigationConfiguration[]>([]);
  protected currentNavigation = signal<INavigationConfiguration[]>([]);

  constructor() {
    effect(() => {
      this.updateSelectedItem(this.router.url);
    });
  }

  ngOnInit(): void {
    // Ejecutar una vez al iniciar
    this.updateSelectedItem(this.router.url);

    // Escuchar cambios de ruta
    this.listenRouteChange();
  }

  listenRouteChange(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSelectedItem(event.urlAfterRedirects);
      });
  }

  private updateSelectedItem(currentUrl: string): void {
    const newNavigationConfig = this.navigationConfig().map(section => ({
      ...section,
      childrens: section.childrens.map(item => ({
        ...item,
        selected: item.path === currentUrl
      }))
    }));

    this.currentNavigation.set(newNavigationConfig);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
