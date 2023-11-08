import * as components from './components'
import { ComponentSymbol, GlobalPropertiesSymbol, DirectiveSymbol } from './constants'
import { version } from './package.json'
import { objectEntries } from './utils'
import type { App } from 'vue'

/**
 * 注册组件
 *
 * @param { Object } app 应用实例
 * @returns { Object } 应用实例
 */
const install = (app: App): App => {
  objectEntries(components).forEach(([key, value]: [string, any]): void => {
    /**
     * 注册组件
     *
     * @see registration https://cn.vuejs.org/guide/components/registration.html
     * @see Array.prototype.forEach() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     */
    if (value[ComponentSymbol] === true) {
      app.component(key, value)
      return
    }

    /**
     * 注册能够被应用内所有组件实例访问到的全局组件
     *
     * @see app.config.globalProperties https://cn.vuejs.org/api/application.html#app-config-globalproperties
     */
    if (value[GlobalPropertiesSymbol] === true) {
      app.config.globalProperties[key] = value
      return
    }

    /**
     * 注册自定义指令组件
     *
     * @see app.directive https://cn.vuejs.org/api/application.html#app-directive
     */
    if (value[DirectiveSymbol]) {
      app.directive(key, value)
    }
  })

  return app
}

export default {
  version,
  install
}
