import { Component, inject } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({ position: 'absolute', width: '100%' })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 })
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('200ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-in', style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  private translate = inject(TranslateService);
  title = 'Slyfox-Suite';
  currentLang: string; // Removed default initialization here
  private readonly LANG_STORAGE_KEY = 'userLanguage'; // Key for localStorage

  constructor() {
    this.translate.setDefaultLang('es');
    const storedLang = localStorage.getItem(this.LANG_STORAGE_KEY);
    if (storedLang && ['es', 'en'].includes(storedLang)) { // Basic validation for supported languages
      this.currentLang = storedLang;
    } else {
      this.currentLang = 'es'; // Default language
    }
    this.translate.use(this.currentLang);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  changeLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem(this.LANG_STORAGE_KEY, lang); // Save to localStorage
  }
}
