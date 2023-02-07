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
  type: "page";
  to?: Location;
  active?: boolean;
  href?: string;
  badge?: string | number;
  badgeTooltip?: string;
}

export interface Section extends NavItem {
  type: "section";
  children: Page[];
  selected: boolean;
}

export type NavItems = Array<Page | Section>;

export class ForgeNavbarBuilder {
  private items: NavItems = [];

  public addPage(label: string, pageConfig?: (page: PageBuilder) => void): ForgeNavbarBuilder {
    const page = new PageBuilder(label);

    if (pageConfig) {
      pageConfig(page);
    }
    this.items.push(page.build());

    return this;
  }

  public addSection(label: string, selected: boolean, sectionConfig?: (section: SectionBuilder) => void): ForgeNavbarBuilder {
    const section = new SectionBuilder(label, selected);

    if (sectionConfig) {
      sectionConfig(section);
    }
    this.items.push(section.build());

    return this;
  }

  public build(): NavItems {
    return this.items;
  }
}

export class PageBuilder {
  private page: Page = {
    type: "page",
    label: "",
    active: false,
    disabled: false,
    visible: true,
    ariaLabel: undefined,
    badge: undefined,
    href: undefined,
    to: undefined,
    badgeTooltip: undefined
  };

  constructor(label: string) {
    this.page.label = label;
  }

  public to(toRoute: Location): PageBuilder {
    this.page.to = toRoute;
    return this;
  }

  public href(toHref: string): PageBuilder {
    this.page.href = toHref;
    return this;
  }

  public active(active: boolean): PageBuilder {
    this.page.active = active;
    return this;
  }

  public ariaLabel(ariaLabel: string): PageBuilder {
    this.page.ariaLabel = ariaLabel;
    return this;
  }

  public disabled(disabled: boolean): PageBuilder {
    this.page.disabled = disabled;
    return this;
  }

  public visible(visible: boolean): PageBuilder {
    this.page.visible = visible;
    return this;
  }

  public badge(badgeData: string | number, tooltip?: string): PageBuilder {
    this.page.badge = badgeData;
    if (tooltip) {
      this.page.badgeTooltip = tooltip;
    }
    return this;
  }

  public build(): Page {
    return this.page;
  }
}

export class SectionBuilder {
  private section: Section = {
    type: "section",
    label: "",
    children: [],
    selected: false,
    disabled: false,
    visible: true,
    ariaLabel: undefined
  };

  constructor(label: string, selected: boolean) {
    this.section.label = label;
    this.section.selected = selected;
  }

  public ariaLabel(ariaLabel: string): SectionBuilder {
    this.section.ariaLabel = ariaLabel;
    return this;
  }

  public disabled(disabled: boolean): SectionBuilder {
    this.section.disabled = disabled;
    return this;
  }

  public visible(visible: boolean): SectionBuilder {
    this.section.visible = visible;
    return this;
  }

  public addSubPage(label: string, subPageConfig?: (subPage: PageBuilder) => void): SectionBuilder {
    const page = new PageBuilder(label);

    if (subPageConfig) {
      subPageConfig(page);
    }
    this.section.children.push(page.build());

    return this;
  }

  public build(): Section {
    return this.section;
  }
}
