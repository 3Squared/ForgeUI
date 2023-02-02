// Components
import ForgeDatePicker from "./src/components/forms/date-picker/DatePicker.vue";
import ForgeStatWidget from "./src/components/general/stat-widget/StatWidget.vue";
import ForgeTable from "./src/components/tables/table/Table.vue";
import ForgeFilterHeader from "./src/components/tables/filter-header/FilterHeader.vue";
import ForgePaginationFooter from "./src/components/tables/pagination/PaginationFooter.vue";
import ForgeIcons from "./src/icons/icons";
import ForgeToasts, { useForgeToasts } from "./src/components/general/toast/toast";
import ForgeModal from "./src/components/general/modal/Modal.vue";
import ForgeModalHelper, { useForgeModal } from "./src/components/general/modal/forge-modal-helper";
import ForgeForm from "./src/components/forms/form/Form.vue";
import ForgeLoader from "./src/components/general/loader/Loader.vue";
import ForgeActionButton from "./src/components/general/action-button/ActionButton.vue";
import ForgeInlineEditor from "./src/components/forms/inline-editor/InlineEditor.vue";
import ForgeFileUpload from "./src/components/forms/file-upload/FileUpload.vue";
import ForgeMultiSelect from "./src/components/forms/multiselect/MultiSelect.vue";
import ForgeChart from "./src/components/general/chart/Chart.vue";
import ForgePageHeader from "./src/components/layout/page-header/PageHeader.vue";
import ForgeMultiSelectPreview from "./src/components/forms/multiselect-preview/MultiSelectPreview.vue";
import ForgeFormField from "./src/components/forms/form-field/FormField.vue";
import ForgeRemainingCharacters from "./src/components/forms/remaining-characters/RemainingCharacters.vue";
import ForgeStepper from "./src/components/layout/stepper/Stepper.vue";

// Validation
import { localize, validate, ValidationObserver, ValidationProvider } from "vee-validate";
import { useForgeValidation } from "./src/validation/forge-validation";

// //Directives
import { alphanumericCharacterDirective, maxNumericCharactersDirective, positiveNumberDirective, wholeNumberDirective } from "./src/directives/index";

// ForgeUI Installer (not recommended if you want to tree-shake your project)
import { PluginObject, VueConstructor } from "vue";
import BootstrapVue, { BootstrapVueIcons } from "bootstrap-vue";

interface VariantConfig {
  variant?: string;
}

type StepperConfig = VariantConfig;
type MultiSelectConfig = VariantConfig;
type StatWidgetConfig = VariantConfig;
type FilterHeaderConfig = VariantConfig;

interface DatePickerConfig extends VariantConfig {
  hideCalendarIcon?: false;
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
    Vue.prototype["ForgeSettings"] = globalConfig;
  }
};

const ForgeUI = {
  install(Vue: VueConstructor) {
    // Bootstrap
    Vue.use(BootstrapVue, {
      BButton: { variant: "primary" }
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

    Vue.directive("positive-number", positiveNumberDirective);
    Vue.directive("whole-number", wholeNumberDirective);
    Vue.directive("alphanumeric-character", alphanumericCharacterDirective);
    Vue.directive("max-numeric-characters", maxNumericCharactersDirective);
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

export * from "./src/helpers/index";
export * from "./src/icons/icons";
