import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue({}),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      dirs: [
        // './src/utils'
      ],
      resolvers: [NaiveUiResolver()],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          // '[package-name]': [
          //   '[import-names]',
          //   // alias
          //   ['[from]', '[alias]']
          // ]
        }
      ],
      dts: 'types/auto-imports.d.ts',
      vueTemplate: true
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts'
    }),
    Unocss({
      configFile: './uno.config.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './types')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/global.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:8888`, // 代理到 目标路径
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const arr = id.toString()?.split('node_modules/')[2]?.split('/')
            if (arr?.includes('vue')) return 'vue'
            else return 'module'
          } else return 'src'
        }
      }
    }
  }
})
