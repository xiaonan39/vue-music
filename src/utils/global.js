export default {
  install(Vue) {
    /* 主要使用require.context实现前端工程化动他引入文件
      require.context(directory, useSubdirectories = false, regExp = /^.//)
      参数1：第一个参数目标文件夹
      参数2：是否查找子集 true | false
      参数3：正则匹配 */
      /* requireAll是base文件夹下所有的文件 */
    const requireAll = require.context("@/base",true,/[a-z0-9]+\.(jsx?|vue)$/i);
    requireAll.keys().forEach(fileName => {
      const componentConfig = requireAll(fileName);
      const componentName = componentConfig.default.name;
      if(componentName) {
        Vue.component(componentName,componentConfig.default || componentConfig);
      }
    });
  }
}