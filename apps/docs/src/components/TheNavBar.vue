﻿<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="w-100">
      <b-navbar-brand>
        <router-link :to="{ path: '/' }">
          <img alt="" height="32px" src="https://cdn.3sq.app/assets/products/forge-ui/images/logo.svg" />
        </router-link>
      </b-navbar-brand>

      <!-- Navbar dropdowns -->
      <div class="d-flex align-items-center">
        <b-nav-item-dropdown v-for="section in sections" :key="section.label" :text="section.label">
          <b-dropdown-item v-for="page in section.children" :key="page.label" :to="page.to">{{ page.label }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-for="page in pages" :key="page.label" :to="page.to">{{ page.label }}</b-nav-item>
      </div>

      <div class="d-flex mt-auto mb-auto ml-auto">
        <route-searcher class="searcher" />
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { ForgeNavbarBuilder, Page, Section } from "@3squared/forge-ui";
import { BDropdownItem, BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown } from "bootstrap-vue";
import routes from "pages-generated";
import RouteSearcher from "./RouteSearcher.vue";
import Vue from "vue";

export default Vue.extend({
  name: "TheNavBar",
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BNavItem,
    RouteSearcher,
    BNavbar,
    BNavbarNav,
    BNavbarBrand
  },
  computed: {
    routes(): any {
      return routes;
    },
    navItems() {
      return new ForgeNavbarBuilder()
        .addSection("Getting Started", this.$route.name?.includes("getting-started-") ? true : false, (s) =>
          s.addSubPage("Get Started", (sp) => sp.to({ name: "getting-started-Installation" }))
        )
        .addSection("Forms", this.$route.name?.includes("forms-") ? true : false, (s) =>
          s
            .addSubPage("Checkbox", (sp) => sp.to({ name: "forms-checkbox-Checkbox" }))
            .addSubPage("Date Picker", (sp) => sp.to({ name: "forms-date-picker-DatePicker" }))
            .addSubPage("File Uploader", (sp) => sp.to({ name: "forms-file-upload-FileUploader" }))
            .addSubPage("Remaining Characters", (sp) => sp.to({ name: "forms-remaining-characters-RemainingCharacters" }))
            .addSubPage("Form", (sp) => sp.to({ name: "forms-form-Form" }))
            .addSubPage("Form Field", (sp) => sp.to({ name: "forms-form-field-FormField" }))
            .addSubPage("Inline Editor", (sp) => sp.to({ name: "forms-inline-editor-InlineEditor" }))
            .addSubPage("Input", (sp) => sp.to({ name: "forms-input-Input" }))
            .addSubPage("Multiselect", (sp) => sp.to({ name: "forms-multiselect-Multiselect" }))
            .addSubPage("Multiselect Preview", (sp) => sp.to({ name: "forms-multiselect-preview-MultiselectPreview" }))
            .addSubPage("Select", (sp) => sp.to({ name: "forms-select-Select" }))
            .addSubPage("Tags", (sp) => sp.to({ name: "forms-tags-Tags" }))
            .addSubPage("Textarea", (sp) => sp.to({ name: "forms-textarea-Textarea" }))
        )
        .addSection("General", this.$route.name?.includes("general-") ? true : false, (s) =>
          s
            .addSubPage("Action Button", (sp) => sp.to({ name: "general-action-button-ActionButton" }))
            .addSubPage("Alert", (sp) => sp.to({ name: "general-alert-Alert" }))
            .addSubPage("Button", (sp) => sp.to({ name: "general-button-Button" }))
            .addSubPage("Chart", (sp) => sp.to({ name: "general-chart-Chart" }))
            .addSubPage("Loader", (sp) => sp.to({ name: "general-loader-Loader" }))
            .addSubPage("Modal", (sp) => sp.to({ name: "general-modal-Modal" }))
            .addSubPage("Popover", (sp) => sp.to({ name: "general-popover-Popover" }))
            .addSubPage("Progress", (sp) => sp.to({ name: "general-progress-Progress" }))
            .addSubPage("Stat Widget", (sp) => sp.to({ name: "general-stat-widget-StatWidget" }))
            .addSubPage("Toast", (sp) => sp.to({ name: "general-toast-Toast" }))
            .addSubPage("Tooltip", (sp) => sp.to({ name: "general-tooltip-Tooltip" }))
        )
        .addSection("Layout", this.$route.name?.includes("layout-") ? true : false, (s) =>
          s
            .addSubPage("Collapse", (sp) => sp.to({ name: "layout-collapse-Collapse" }))
            .addSubPage("Page Header", (sp) => sp.to({ name: "layout-page-header-PageHeader" }))
            .addSubPage("Stepper", (sp) => sp.to({ name: "layout-stepper-Stepper" }))
            .addSubPage("Tabs", (sp) => sp.to({ name: "layout-tabs-Tabs" }))
        )
        .addSection("Tables", this.$route.name?.includes("tables-") ? true : false, (s) =>
          s
            .addSubPage("Filter Header", (sp) => sp.to({ name: "tables-filter-header-FilterHeader" }))
            .addSubPage("Table", (sp) => sp.to({ name: "tables-table-Table" }))
        )
        .addPage("Icons", (p) => p.to({ name: "Icons-Icons" }))
        .addPage("Colours", (p) => p.to({ name: "Colours" }))
        .build();
    },
    sections(): Section[] {
      return this.navItems.filter((n) => n.type === "section") as Section[];
    },
    pages(): Page[] {
      return this.navItems.filter((n) => n.type === "page") as Page[];
    }
  }
});
</script>

<style>
.searcher {
  width: 300px !important;
}
</style>
