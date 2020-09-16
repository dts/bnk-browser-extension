import 'webextension-polyfill'
import Vue from 'vue'
import Popup from './popup/index.vue'
import OptionsStorage from './options-storage'

Vue.prototype.$extensionOptions = OptionsStorage;
window.extensionOptions = OptionsStorage;

new Vue(Popup);
