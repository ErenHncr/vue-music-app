import { createApp } from 'vue';
import Icon from './directives/icon';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';
import i18n from './includes/i18n';
import GlobalComponents from './includes/_globals';
import ProgressBar from './includes/progress-bar';
import './registerServiceWorker';

import 'nprogress/nprogress.css';
import './assets/tailwind.css';
import './assets/css/main.css';

ProgressBar(router);

let app;

// disable log
// TODO: move console disable function to helper file or includes directory
console.disable = () => {
  if (console) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.debug = () => {};
  }
  if (window?.console) {
    window.console.log = () => {};
    window.console.warn = () => {};
    window.console.error = () => {};
    window.console.debug = () => {};
  }
};
if (process.env.NODE_ENV === 'production') {
  console.disable();
}

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(GlobalComponents);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
