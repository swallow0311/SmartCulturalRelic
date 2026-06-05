export interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
}

export interface Module {
  id: string;
  label: string;
  icon?: string;
  menus: MenuItem[];
}