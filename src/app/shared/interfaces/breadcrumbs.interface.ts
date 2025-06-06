export interface IBreadcrumb {
  Configuration: IBreadcrumbsConfiguration[];
}

export interface IBreadcrumbsConfiguration {
  path:        string;
  breadcrumbs: BreadcrumbElement[];
}

export interface BreadcrumbElement {
  label: string;
  path:  string;
  selected?: boolean;
}
