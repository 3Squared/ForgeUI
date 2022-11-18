var d = Object.defineProperty;
var h = (t, e, i) => e in t ? d(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var a = (t, e, i) => (h(t, typeof e != "symbol" ? e + "" : e, i), i);
class u {
  constructor() {
    a(this, "items", []);
  }
  addPage(e, i) {
    const s = new l(e);
    return i && i(s), this.items.push(s.build()), this;
  }
  addSection(e, i, s) {
    const r = new b(e, i);
    return s && s(r), this.items.push(r.build()), this;
  }
  build() {
    return this.items;
  }
}
class l {
  constructor(e) {
    a(this, "page", {
      type: "page",
      label: "",
      active: !1,
      disabled: !1,
      visible: !0,
      ariaLabel: void 0,
      badge: void 0,
      href: void 0,
      to: void 0,
      badgeTooltip: void 0
    });
    this.page.label = e;
  }
  to(e) {
    return this.page.to = e, this;
  }
  href(e) {
    return this.page.href = e, this;
  }
  active(e) {
    return this.page.active = e, this;
  }
  ariaLabel(e) {
    return this.page.ariaLabel = e, this;
  }
  disabled(e) {
    return this.page.disabled = e, this;
  }
  visible(e) {
    return this.page.visible = e, this;
  }
  badge(e, i) {
    return this.page.badge = e, i && (this.page.badgeTooltip = i), this;
  }
  build() {
    return this.page;
  }
}
class b {
  constructor(e, i) {
    a(this, "section", {
      type: "section",
      label: "",
      children: [],
      selected: !1,
      disabled: !1,
      visible: !0,
      ariaLabel: void 0
    });
    this.section.label = e, this.section.selected = i;
  }
  ariaLabel(e) {
    return this.section.ariaLabel = e, this;
  }
  disabled(e) {
    return this.section.disabled = e, this;
  }
  visible(e) {
    return this.section.visible = e, this;
  }
  addSubPage(e, i) {
    const s = new l(e);
    return i && i(s), this.section.children.push(s.build()), this;
  }
  build() {
    return this.section;
  }
}
export {
  u as ForgeNavbarBuilder,
  l as PageBuilder,
  b as SectionBuilder
};
