import { Component, inject, OnInit, signal } from '@angular/core';
import { SlyfoxUiAvatarComponent, SlyfoxUiIconComponent } from 'slyfox-ui';
import { ISidebarOption } from '@interfaces/layout-params.interface';
import { ParamsService } from '@services/params.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [SlyfoxUiAvatarComponent, SlyfoxUiIconComponent, RouterModule, TranslateModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.scss'
})
export class SidebarNavigationComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected sidebarOptions!: ISidebarOption[];
  protected logoutISLoading = signal(false);
  constructor(private paramsService: ParamsService) { }

  ngOnInit(): void {
    this.getSidebarOptions();
  }

  private getSidebarOptions() {
    this.paramsService.getLayoutParams()
      .subscribe((params) => this.sidebarOptions = params.SidebarOptions)
  }

  protected logout(): void {
    if(this.logoutISLoading()) return;
    this.logoutISLoading.set(true);

    this.authService.logoutUser()
      .subscribe({
        next: (success) => {
          this.router.navigate(['/login']);
           this.logoutISLoading.set(false);
        },
        error: (err) => {
          console.error('Error durante el proceso de logout:', err);
          this.router.navigate(['/login']);
           this.logoutISLoading.set(false);
        }
      });
  }
}
