export interface Location {
    name?: string;
    path?: string;
    hash?: string;
    query?: Record<string, string | (string | null)[] | null | undefined>;
    params?: Record<string, string>;
    append?: boolean;
    replace?: boolean;
}
interface NavItem {
    label: string;
    disabled?: boolean;
    visible?: boolean;
    ariaLabel?: string;
}
export interface Page extends NavItem {
    type: 'page';
    to?: Location;
    active?: boolean;
    href?: string;
    badge?: string | number;
    badgeTooltip?: string;
}
export interface Section extends NavItem {
    type: 'section';
    children: Page[];
    selected: boolean;
}
export declare type NavItems = Array<Page | Section>;
export declare class ForgeNavbarBuilder {
    private items;
    addPage(label: string, pageConfig?: (page: PageBuilder) => void): ForgeNavbarBuilder;
    addSection(label: string, selected: boolean, sectionConfig?: (section: SectionBuilder) => void): ForgeNavbarBuilder;
    build(): NavItems;
}
export declare class PageBuilder {
    private page;
    constructor(label: string);
    to(toRoute: Location): PageBuilder;
    href(toHref: string): PageBuilder;
    active(active: boolean): PageBuilder;
    ariaLabel(ariaLabel: string): PageBuilder;
    disabled(disabled: boolean): PageBuilder;
    visible(visible: boolean): PageBuilder;
    badge(badgeData: string | number, tooltip?: string): PageBuilder;
    build(): Page;
}
export declare class SectionBuilder {
    private section;
    constructor(label: string, selected: boolean);
    ariaLabel(ariaLabel: string): SectionBuilder;
    disabled(disabled: boolean): SectionBuilder;
    visible(visible: boolean): SectionBuilder;
    addSubPage(label: string, subPageConfig?: (subPage: PageBuilder) => void): SectionBuilder;
    build(): Section;
}
export {};
//# sourceMappingURL=navbar.builder.d.ts.map