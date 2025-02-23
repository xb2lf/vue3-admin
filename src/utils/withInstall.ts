/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-02-17 15:39:04
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-02-17 15:40:40
 * @Description:
 */
import type { Plugin } from 'vue'

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E,
): T => {
  ;(main as SFCWithInstall<T>).install = (app: {
    component: (arg0: any, arg1: any) => void
  }): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export type SFCWithInstall<T> = T & Plugin
