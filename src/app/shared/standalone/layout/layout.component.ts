import { Component, OnInit } from '@angular/core';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { LayoutHeaderComponent } from "./layout-header/layout-header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, SidebarNavigationComponent, LayoutHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{



}
