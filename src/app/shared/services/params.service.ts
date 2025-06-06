import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILayoutParams } from '../interfaces/layout-params.interface';
import { Observable, shareReplay } from 'rxjs';
import { IBreadcrumb } from '@interfaces/breadcrumbs.interface';
import { INavigation } from '@interfaces/module-navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private layoutParams$?: Observable<ILayoutParams>;

  constructor(private http: HttpClient) { }

  getLayoutParams(): Observable<ILayoutParams> {
    if (!this.layoutParams$) {
      this.layoutParams$ = this.http.get<ILayoutParams>('params/layout.params.json').pipe(
        shareReplay(1)
      );
    }

    return this.layoutParams$;
  }

  getBreadcrumbsConfig(): Observable<IBreadcrumb> {
    return this.http.get<IBreadcrumb>('params/breadcrumbs.config.json').pipe(
      shareReplay(1)
    );
  }

  getAdministrationNavigation(): Observable<INavigation> {
    return this.http.get<INavigation>('params/administration.navigation.json').pipe(
      shareReplay(1)
    );
  }

}
