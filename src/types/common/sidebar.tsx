
export interface SubMenuItem {
    label: string;
    path: string;
}

export interface MenuItem {
    icon: JSX.Element;
    label: string;
    path: string;
    subMenuItems?: SubMenuItem[];
}

export interface ModuleSection {
    title: string;
    items: MenuItem[];
}