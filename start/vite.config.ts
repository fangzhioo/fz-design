import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfigExport } from 'vite'

export default (): UserConfigExport => {
  return {
    base: './',
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      })
    ],
    server: {
      port: 1216
    },
    resolve: {
      alias: {
        'fz-design': resolve(__dirname, '../packages/fz-design/index.ts')
      }
    }
  }
}
