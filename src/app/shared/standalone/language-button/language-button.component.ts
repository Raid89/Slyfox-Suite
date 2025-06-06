import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-language-button',
  imports: [CommonModule],
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss']
})
export class LanguageButtonComponent implements OnInit {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private readonly LANG_STORAGE_KEY = 'userLanguage'; // Key for localStorage
  protected currentLang: string; // Removed default initialization here
  protected currentRoute!: string; // Current route for navigation
  protected admittedRoutes = ['/login', '/register']; // Example routes where the language button is visible

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

  ngOnInit() {
    // Initialize current route
    this.getCurrentRoute();
  }

  getCurrentRoute() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
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
