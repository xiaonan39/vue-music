import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/utils/axios';

import "@/style/index.scss";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  //切记引用此文件，否则icon不生效
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';
/* const i18n = new VueI18n({ 
   locale: 'zh', // 定义默认语言为中文 
   messages: {   
    enLocale,   
    zhLocale
  }
  }); */
Vue.use(ElementUI);
Vue.use(router)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
