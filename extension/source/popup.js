import 'webextension-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Popup from './popup/index.vue'
import PersistPageData from './utils/persist-page-data';

// auto-load all components:
const requireComponent = require.context('./popup/components',true,/^[^_].*?\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');

  Vue.component(componentName,componentConfig.default || componentConfig);
});

Vue.use(Router)
Vue.mixin(PersistPageData);


new Vue(Popup);
