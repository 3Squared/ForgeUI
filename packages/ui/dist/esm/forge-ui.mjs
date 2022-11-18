import a from "./components/forms/date-picker/forge-ui.mjs";
import { default as or } from "./components/forms/date-picker/forge-ui.mjs";
import i from "./components/general/stat-widget/forge-ui.mjs";
import { default as ar } from "./components/general/stat-widget/forge-ui.mjs";
import m from "./components/tables/table/forge-ui.mjs";
import { default as mr } from "./components/tables/table/forge-ui.mjs";
import l from "./components/tables/filter-header/forge-ui.mjs";
import { default as gr } from "./components/tables/filter-header/forge-ui.mjs";
import g from "./components/tables/pagination/forge-ui.mjs";
import { default as Fr } from "./components/tables/pagination/forge-ui.mjs";
import n from "./icons/forge-ui.mjs";
import { BIconForgeAddCircle as fr, BIconForgeAddHeavy as cr, BIconForgeBarChart as sr, BIconForgeBell as dr, BIconForgeCancel as ur, BIconForgeColumns as xr, BIconForgeEqualHeavy as Br, BIconForgeExclamationMark as Ir, BIconForgeExpandFill as vr, BIconForgeExport as hr, BIconForgeFilter as Cr, BIconForgeGraph as br, BIconForgeInfo as Sr, BIconForgeLineChart as Mr, BIconForgeMap as Pr, BIconForgeMinimiseFill as Nr, BIconForgeNote as Dr, BIconForgePrint as Hr, BIconForgeRefresh as Tr, BIconForgeShowPlanned as Er, BIconForgeSplitArrows as wr, BIconForgeSubtractHeavy as yr, BIconForgeThumbUp as zr, default as Ar } from "./icons/forge-ui.mjs";
import F from "./components/general/toast/forge-ui.mjs";
import { default as kr, useForgeToasts as Ur } from "./components/general/toast/forge-ui.mjs";
import p from "./components/general/modal/forge-ui.mjs";
import { default as qr } from "./components/general/modal/forge-ui.mjs";
import f from "./components/general/modal/forge-ui2.mjs";
import { default as Wr, useForgeModal as jr } from "./components/general/modal/forge-ui2.mjs";
import c from "./components/forms/form/forge-ui.mjs";
import { default as Jr } from "./components/forms/form/forge-ui.mjs";
import s from "./components/general/loader/forge-ui.mjs";
import { default as Qr } from "./components/general/loader/forge-ui.mjs";
import d from "./components/general/action-button/forge-ui.mjs";
import { default as Yr } from "./components/general/action-button/forge-ui.mjs";
import u from "./components/forms/inline-editor/forge-ui.mjs";
import { default as _r } from "./components/forms/inline-editor/forge-ui.mjs";
import x from "./components/forms/file-upload/forge-ui.mjs";
import { default as Vr } from "./components/forms/file-upload/forge-ui.mjs";
import B from "./components/forms/multiselect/forge-ui.mjs";
import { default as ee } from "./components/forms/multiselect/forge-ui.mjs";
import { default as te } from "./components/general/chart/forge-ui.mjs";
import I from "./components/layout/page-header/forge-ui.mjs";
import { default as ie } from "./components/layout/page-header/forge-ui.mjs";
import v from "./components/forms/multiselect-preview/forge-ui.mjs";
import { default as le } from "./components/forms/multiselect-preview/forge-ui.mjs";
import h from "./components/forms/form-field/forge-ui.mjs";
import { default as ne } from "./components/forms/form-field/forge-ui.mjs";
import C from "./components/forms/remaining-characters/forge-ui.mjs";
import { default as pe } from "./components/forms/remaining-characters/forge-ui.mjs";
import b from "./components/layout/stepper/forge-ui.mjs";
import { default as ce } from "./components/layout/stepper/forge-ui.mjs";
import { ValidationObserver as de, ValidationProvider as ue, localize as xe, validate as Be } from "vee-validate";
import { useForgeValidation as ve } from "./validation/forge-ui.mjs";
import { positiveNumberDirective as S, wholeNumberDirective as M, alphanumericCharacterDirective as P, maxNumericCharactersDirective as N } from "./directives/forge-ui.mjs";
import { alphanumericCharacterDirective as Ce, maxNumericCharactersDirective as be, positiveNumberDirective as Se, wholeNumberDirective as Me } from "./directives/forge-ui.mjs";
import D, { BootstrapVueIcons as H } from "bootstrap-vue";
import { arraysEqual as Ne, capitalize as De, enumToMultiSelectList as He, enumToSelectList as Te, getColour as Ee, kebabToCamel as we, nameof as ye, parseError as ze, startCase as Ae, stringFilterMatch as Le } from "./helpers/forge-ui.mjs";
import { ValidateableComponent as Ue, getValidationState as Re } from "./helpers/forge-ui2.mjs";
import { ForgeColumnBuilder as Ge } from "./helpers/forge-ui3.mjs";
import { ForgeModalBuilder as je } from "./helpers/forge-ui4.mjs";
import { dayjsNormalizer as Je, nativeNormalizer as Ke, stringNormalizer as Qe } from "./helpers/forge-ui5.mjs";
import { ForgeNavbarBuilder as Ye, PageBuilder as Ze, SectionBuilder as _e } from "./helpers/forge-ui6.mjs";
const $ = {
  install(e, t) {
    e.prototype.ForgeSettings = t;
  }
}, V = {
  install(e) {
    e.use(D, {
      BButton: { variant: "primary" }
    }), e.use(F), e.use(f), e.use(H), e.use(n);
    function t(o) {
      return o.options && o.options.name ? o.options.name : o.name;
    }
    function r(o) {
      e.component(t(o), o);
    }
    r(a), r(i), r(p), r(m), r(s), r(l), r(g), r(c), r(d), r(u), r(B), r(I), r(v), r(h), r(b), r(x), r(C), e.directive("positive-number", S), e.directive("whole-number", M), e.directive("alphanumeric-character", P), e.directive("max-numeric-characters", N);
  }
};
export {
  fr as BIconForgeAddCircle,
  cr as BIconForgeAddHeavy,
  sr as BIconForgeBarChart,
  dr as BIconForgeBell,
  ur as BIconForgeCancel,
  xr as BIconForgeColumns,
  Br as BIconForgeEqualHeavy,
  Ir as BIconForgeExclamationMark,
  vr as BIconForgeExpandFill,
  hr as BIconForgeExport,
  Cr as BIconForgeFilter,
  br as BIconForgeGraph,
  Sr as BIconForgeInfo,
  Mr as BIconForgeLineChart,
  Pr as BIconForgeMap,
  Nr as BIconForgeMinimiseFill,
  Dr as BIconForgeNote,
  Hr as BIconForgePrint,
  Tr as BIconForgeRefresh,
  Er as BIconForgeShowPlanned,
  wr as BIconForgeSplitArrows,
  yr as BIconForgeSubtractHeavy,
  zr as BIconForgeThumbUp,
  Yr as ForgeActionButton,
  te as ForgeChart,
  Ge as ForgeColumnBuilder,
  or as ForgeDatePicker,
  Vr as ForgeFileUpload,
  gr as ForgeFilterHeader,
  Jr as ForgeForm,
  ne as ForgeFormField,
  $ as ForgeGlobalConfigPlugin,
  Ar as ForgeIcons,
  _r as ForgeInlineEditor,
  Qr as ForgeLoader,
  qr as ForgeModal,
  je as ForgeModalBuilder,
  Wr as ForgeModalHelper,
  ee as ForgeMultiSelect,
  le as ForgeMultiSelectPreview,
  Ye as ForgeNavbarBuilder,
  ie as ForgePageHeader,
  Fr as ForgePaginationFooter,
  pe as ForgeRemainingCharacters,
  ar as ForgeStatWidget,
  ce as ForgeStepper,
  mr as ForgeTable,
  kr as ForgeToasts,
  V as ForgeUI,
  Ze as PageBuilder,
  _e as SectionBuilder,
  Ue as ValidateableComponent,
  de as ValidationObserver,
  ue as ValidationProvider,
  Ce as alphanumericCharacterDirective,
  Ne as arraysEqual,
  De as capitalize,
  Je as dayjsNormalizer,
  V as default,
  He as enumToMultiSelectList,
  Te as enumToSelectList,
  Ee as getColour,
  Re as getValidationState,
  we as kebabToCamel,
  xe as localize,
  be as maxNumericCharactersDirective,
  ye as nameof,
  Ke as nativeNormalizer,
  ze as parseError,
  Se as positiveNumberDirective,
  Ae as startCase,
  Le as stringFilterMatch,
  Qe as stringNormalizer,
  jr as useForgeModal,
  Ur as useForgeToasts,
  ve as useForgeValidation,
  Be as validate,
  Me as wholeNumberDirective
};
