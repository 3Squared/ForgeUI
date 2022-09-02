<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-navbar-brand>
        <router-link :to="{path : '/'}">
          <img alt="" height="32px" src="https://cdn.3sq.app/assets/products/forge-ui/images/logo.svg" />
        </router-link>
      </b-navbar-brand>


      <!-- Navbar dropdowns -->
      <div class="d-flex align-items-center">
        <b-nav-item-dropdown v-for="section in sections" :text="section.label" :key="section.label">
          <b-dropdown-item v-for="page in section.children" :key="page.label" :to="page.to">{{ page.label }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-for="page in pages" :key="page.label" :to="page.to">{{ page.label }}</b-nav-item>
      </div>

      <div class="ml-lg-auto">
        <div class="d-flex">
          <div class="smallSearch">
            <RouteSearcher class="position-relative smallSearch" />
          </div>
          <b-button class="mx-3 btn-sm btn-outline-success rounded" target="_blank" @click="openSlackHelp"
          ><img class="slacklogo mr-1" src="../assets/slacklogo.png" /><span class="font-weight-bold">Get Help</span>
          </b-button>
        </div>
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { ForgeNavbarBuilder, Page, Section } from '@3squared/forge-ui';
import { BButton, BDropdownItem, BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavItemDropdown } from 'bootstrap-vue';
// @ts-ignore
import routes from 'pages-generated';
import RouteSearcher from './RouteSearcher.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'TheNavBar',
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BButton,
    BNavItem,
    RouteSearcher,
    BNavbar, BNavbarNav, BNavbarBrand
  },
  computed: {
    routes(): any {
      return routes;
    },
    navItems() {
      return new ForgeNavbarBuilder()
          .addSection('Getting Started', this.$route.name?.includes('getting-started-') ? true : false, (s) =>
              s
                  .addSubPage('Get Started', (sp) => sp.to({ name: 'getting-started-Installation' }))
                  .addSubPage('Migrate v1 to v2', (sp) => sp.to({ name: 'getting-started-migrations-V1ToV2' }))
                  .addSubPage('Migrate v2 to v3', (sp) => sp.to({ name: 'getting-started-migrations-V2ToV3' }))
                  .addSubPage('Migrate v3 to v4', (sp) => sp.to({ name: 'getting-started-migrations-V3ToV4' }))
                  .addSubPage('Migrate v4 to v5', (sp) => sp.to({ name: 'getting-started-migrations-V4ToV5' }))
                  .addSubPage('Vue.js & .NET using Forge.Loader', (sp) => sp.to({ name: 'getting-started-integrations-ForgeLoader' }))
          )
          .addSection('Forms', this.$route.name?.includes('forms-') ? true : false, (s) =>
              s
                  .addSubPage('Checkbox', (sp) => sp.to({ name: 'forms-checkbox-Checkbox' }))
                  .addSubPage('Date Picker', (sp) => sp.to({ name: 'forms-date-picker-DatePicker' }))
                  .addSubPage('File Uploader', (sp) => sp.to({ name: 'forms-file-upload-FileUploader' }))
                  .addSubPage('Remaining Characters', (sp) => sp.to({ name: 'forms-remaining-characters-RemainingCharacters' }))
                  .addSubPage('Form', (sp) => sp.to({ name: 'forms-form-Form' }))
                  .addSubPage('Form Field', (sp) => sp.to({ name: 'forms-form-field-FormField' }))
                  .addSubPage('Inline Editor', (sp) => sp.to({ name: 'forms-inline-editor-InlineEditor' }))
                  .addSubPage('Input', (sp) => sp.to({ name: 'forms-input-Input' }))
                  .addSubPage('Multiselect', (sp) => sp.to({ name: 'forms-multiselect-Multiselect' }))
                  .addSubPage('Multiselect Preview', (sp) => sp.to({ name: 'forms-multiselect-preview-MultiselectPreview' }))
                  .addSubPage('Select', (sp) => sp.to({ name: 'forms-select-Select' }))
                  .addSubPage('Tags', (sp) => sp.to({ name: 'forms-tags-Tags' }))
                  .addSubPage('Textarea', (sp) => sp.to({ name: 'forms-textarea-Textarea' }))
          )
          .addSection('General', this.$route.name?.includes('general-') ? true : false, (s) =>
              s
                  .addSubPage('Action Button', (sp) => sp.to({ name: 'general-action-button-ActionButton' }))
                  .addSubPage('Alert', (sp) => sp.to({ name: 'general-alert-Alert' }))
                  .addSubPage('Button', (sp) => sp.to({ name: 'general-button-Button' }))
                  .addSubPage('Chart', (sp) => sp.to({ name: 'general-chart-Chart' }))
                  .addSubPage('Loader', (sp) => sp.to({ name: 'general-loader-Loader' }))
                  .addSubPage('Modal', (sp) => sp.to({ name: 'general-modal-Modal' }))
                  .addSubPage('Popover', (sp) => sp.to({ name: 'general-popover-Popover' }))
                  .addSubPage('Progress', (sp) => sp.to({ name: 'general-progress-Progress' }))
                  .addSubPage('Stat Widget', (sp) => sp.to({ name: 'general-stat-widget-StatWidget' }))
                  .addSubPage('Toast', (sp) => sp.to({ name: 'general-toast-Toast' }))
                  .addSubPage('Tooltip', (sp) => sp.to({ name: 'general-tooltip-Tooltip' }))
          )
          .addSection('Layout', this.$route.name?.includes('layout-') ? true : false, (s) =>
              s
                  .addSubPage('Collapse', (sp) => sp.to({ name: 'layout-collapse-Collapse' }))
                  .addSubPage('Page Header', (sp) => sp.to({ name: 'layout-page-header-PageHeader' }))
                  .addSubPage('Stepper', (sp) => sp.to({ name: 'layout-stepper-Stepper' }))
                  .addSubPage('Tabs', (sp) => sp.to({ name: 'layout-tabs-Tabs' }))
          )
          .addSection('Tables', this.$route.name?.includes('tables-') ? true : false, (s) =>
              s
                  .addSubPage('Filter Header', (sp) => sp.to({ name: 'tables-filter-header-FilterHeader' }))
                  .addSubPage('Table', (sp) => sp.to({ name: 'tables-table-Table' }))
          )
          .addPage('Icons', (p) => p.to({ name: 'Icons-Icons' }))
          .addPage('Colours', (p) => p.to({ name: 'Colours' }))
          .addPage('FAQs', (p) => p.to({ name: 'FAQs' }))
          .build();
    },
    sections(): Section[] {
      return this.navItems.filter(n => n.type === 'section') as Section[]
    },
    pages(): Page[] {
      return this.navItems.filter(n => n.type === 'page') as Page[]
    }
  },
  methods: {
    openSlackHelp() {
      window.open(
          'https://3squared.slack.com/app_redirect?channel=forge-ui',
          'targetWindow',
          `toolbar=no,
      status=no,
      width=600px,
      height=400px`
      );
    }
  }
});
</script>

<style>
.slacklogo {
  width: 16px;
  position: relative;
  top: -2px;
}

.smallSearch {
  height: 10px !important;
  top: -7px;
}
</style>
