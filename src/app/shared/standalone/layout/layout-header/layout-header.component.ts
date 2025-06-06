import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-layout-header',
  imports: [BreadcrumbComponent, NotificationsComponent],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss'
})
export class LayoutHeaderComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
  }

}
