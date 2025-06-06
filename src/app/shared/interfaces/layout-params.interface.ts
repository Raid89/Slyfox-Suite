export interface ILayoutParams {
  SidebarOptions: ISidebarOption[];
}

export interface ISidebarOption {
  iconCategory: string;
  iconName: string;
  label: string;
  route: string;
  selected: boolean;
}