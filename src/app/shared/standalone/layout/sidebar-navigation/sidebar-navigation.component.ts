import { Component, OnInit } from '@angular/core';
import { SlyfoxUiAvatarComponent, SlyfoxUiIconComponent } from 'slyfox-ui';
import { ISidebarOption } from '@interfaces/layout-params.interface';
import { ParamsService } from '@services/params.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [SlyfoxUiAvatarComponent, SlyfoxUiIconComponent, RouterModule, TranslateModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.scss'
})
export class SidebarNavigationComponent implements OnInit {

  protected sidebarOptions!: ISidebarOption[];

  constructor(private paramsService: ParamsService) {}

  ngOnInit(): void {
    this.getSidebarOptions();
  }

  private getSidebarOptions() {
    this.paramsService.getLayoutParams()
      .subscribe((params) => this.sidebarOptions = params.SidebarOptions)
  }
}
