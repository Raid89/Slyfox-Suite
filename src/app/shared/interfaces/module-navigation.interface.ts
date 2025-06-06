export interface INavigation {
  Configuration: INavigationConfiguration[];
}

export interface INavigationConfiguration {
  title:     string;
  childrens: Children[];
}

export interface Children {
  label:        string;
  iconCategory: string;
  iconName:     string;
  path:         string;
  selected?:    boolean;
}
