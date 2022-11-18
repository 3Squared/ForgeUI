import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './styleguide.scss';
import 'prismjs';
import '@3squared/forge-playground/dist/style.css';
import routes from 'pages-generated';

import { alphanumericCharacterDirective, ForgeGlobalConfigPlugin, maxNumericCharactersDirective, positiveNumberDirective, wholeNumberDirective } from '@3squared/forge-ui';

// @ts-ignore
// import {registerSW} from 'virtual:pwa-register'
//
// registerSW();

Vue.use(VueRouter);

Vue.directive('positive-number', positiveNumberDirective);
Vue.directive('whole-number', wholeNumberDirective);
Vue.directive('alphanumeric-character', alphanumericCharacterDirective);
Vue.directive('max-numeric-characters', maxNumericCharactersDirective);

Vue.config.productionTip = false;
Vue.prototype['forgeSettings'] = {
  Stepper: {
    variant: 'danger'
  }
};

const router = new VueRouter({
  routes,
  scrollBehavior: (to, _, savedPosition) => (to.hash ? { selector: to.hash } : savedPosition)
});

// Router Hooks
router.afterEach(() => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
