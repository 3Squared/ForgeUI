// Components
import ForgeDatePicker from '@/components/forms/date-picker/DatePicker.vue.js';
import ForgeStatWidget from '@/components/general/stat-widget/StatWidget.vue.js';
import ForgeTable from '@/components/tables/table/Table.vue.js';
import ForgeFilterHeader from '@/components/tables/filter-header/FilterHeader.vue.js';
import ForgePaginationFooter from '@/components/tables/pagination/PaginationFooter.vue.js';
import ForgeIcons from '@/icons/icons';
import ForgeToasts, { useForgeToasts } from '@/components/general/toast/toast';
import ForgeModal from '@/components/general/modal/Modal.vue.js';
import ForgeModalHelper, { useForgeModal } from '@/components/general/modal/forge-modal-helper';
import ForgeForm from '@/components/forms/form/Form.vue.js';
import ForgeLoader from '@/components/general/loader/Loader.vue.js';
import ForgeActionButton from '@/components/general/action-button/ActionButton.vue.js';
import ForgeInlineEditor from '@/components/forms/inline-editor/InlineEditor.vue.js';
import ForgeFileUpload from '@/components/forms/file-upload/FileUpload.vue.js';
import ForgeMultiSelect from '@/components/forms/multiselect/MultiSelect.vue.js';
import ForgeChart from '@/components/general/chart/Chart.vue.js';
import ForgePageHeader from '@/components/layout/page-header/PageHeader.vue.js';
import ForgeMultiSelectPreview from '@/components/forms/multiselect-preview/MultiSelectPreview.vue';
import ForgeFormField from '@/components/forms/form-field/FormField.vue.js';
import ForgeRemainingCharacters from '@/components/forms/remaining-characters/RemainingCharacters.vue.js';
import ForgeStepper from '@/components/layout/stepper/Stepper.vue.js';

// Validation
import { localize, validate, ValidationObserver, ValidationProvider } from 'vee-validate';
import { useForgeValidation } from '@/validation/forge-validation';

// //Directives
import { alphanumericCharacterDirective, maxNumericCharactersDirective, positiveNumberDirective, wholeNumberDirective } from '@/directives/index';

// ForgeUI Installer (not recommended if you want to tree-shake your project)
import { PluginObject, VueConstructor } from 'vue';
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue';

interface VariantConfig {
  variant?: string;
}

interface StepperConfig extends VariantConfig {}
interface MultiSelectConfig extends VariantConfig {}
interface StatWidgetConfig extends VariantConfig {}
interface FilterHeaderConfig extends VariantConfig {}

interface DatePickerConfig extends VariantConfig {
  hideCalendarIcon? : false
}

interface ForgeGlobalConfig {
  Stepper?: StepperConfig;
  DatePicker?: DatePickerConfig;
  MultiSelect?: MultiSelectConfig;
  StatWidget?: StatWidgetConfig;
  FilterHeader?: FilterHeaderConfig;
}

const ForgeGlobalConfigPlugin: PluginObject<any> = {
  install(Vue, globalConfig: ForgeGlobalConfig) {
    Vue.prototype['ForgeSettings'] = globalConfig;
  }
};

const ForgeUI = {
  install(Vue: VueConstructor) {
    // Bootstrap
    Vue.use(BootstrapVue, {
      BButton: { variant: 'primary' }
    });

    //For some reason these have to be up hear or the icons page doesnt work
    Vue.use(ForgeToasts);
    Vue.use(ForgeModalHelper);

    Vue.use(BootstrapVueIcons);

    // Forge
    Vue.use(ForgeIcons);

    function getComponentName(component: any) {
      if (component.options && component.options.name) {
        return component.options.name;
      } else {
        return component.name;
      }
    }

    function registerComponent(component: any) {
      Vue.component(getComponentName(component), component);
    }

    registerComponent(ForgeDatePicker);
    registerComponent(ForgeStatWidget);
    registerComponent(ForgeModal);
    registerComponent(ForgeTable);
    registerComponent(ForgeLoader);
    registerComponent(ForgeFilterHeader);
    registerComponent(ForgePaginationFooter);
    registerComponent(ForgeForm);
    registerComponent(ForgeActionButton);
    registerComponent(ForgeInlineEditor);
    registerComponent(ForgeMultiSelect);
    registerComponent(ForgePageHeader);
    registerComponent(ForgeMultiSelectPreview);
    registerComponent(ForgeFormField);
    registerComponent(ForgeStepper);
    registerComponent(ForgeFileUpload);
    registerComponent(ForgeRemainingCharacters);

    Vue.directive('positive-number', positiveNumberDirective);
    Vue.directive('whole-number', wholeNumberDirective);
    Vue.directive('alphanumeric-character', alphanumericCharacterDirective);
    Vue.directive('max-numeric-characters', maxNumericCharactersDirective);
  }
};

export {
  // Components
  ForgeDatePicker,
  ForgeStatWidget,
  ForgeTable,
  ForgeFilterHeader,
  ForgePaginationFooter,
  ForgeIcons,
  ForgeToasts,
  ForgeModal,
  ForgeModalHelper,
  ForgeForm,
  ForgeLoader,
  ForgeActionButton,
  ForgeInlineEditor,
  ForgeMultiSelect,
  ForgeChart,
  ForgePageHeader,
  ForgeMultiSelectPreview,
  ForgeFormField,
  ForgeStepper,
  ForgeFileUpload,
  ForgeRemainingCharacters,
  // Validation
  useForgeValidation,
  ValidationProvider,
  ValidationObserver,
  validate,
  localize,
  // Directives
  positiveNumberDirective,
  wholeNumberDirective,
  alphanumericCharacterDirective,
  maxNumericCharactersDirective,
  // ForgeUI Plugin
  ForgeUI,
  // Composables
  useForgeToasts,
  useForgeModal,
  ForgeGlobalConfigPlugin
};

export default ForgeUI;

export * from '@/helpers/index';
export * from '@/icons/icons';