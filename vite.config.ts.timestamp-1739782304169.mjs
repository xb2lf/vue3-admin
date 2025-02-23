// vite.config.ts
import { loadEnv } from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/vite@4.2.0_@types+node@22.13.4_sass@1.62.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/@vitejs+plugin-vue@4.1.0_vite@4.2.0_vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/unplugin-auto-import@0.16.0_rollup@2.79.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.2_vue@3.5.13/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.2_vue@3.5.13/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { viteMockServe } from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.2_vite@4.2.0/node_modules/vite-plugin-mock/dist/index.js";
import DefineOptions from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/unplugin-vue-define-options@1.3.5_rollup@2.79.2_vue@3.5.13/node_modules/unplugin-vue-define-options/dist/vite.mjs";
import VueSetupExtend from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.2.0/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/%E5%89%8D%E7%AB%AF/js%E8%AF%BE%E7%A8%8B/%E8%87%AA%E6%88%91%E5%AD%A6%E4%B9%A0/VUE%E4%B8%93%E7%94%A8%E6%96%87%E4%BB%B6%E5%A4%B9/VUE3/vue3_basic/vue3_admin_template/vue3-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.2.0/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var vite_config_default = ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "./",
    plugins: [
      VueSetupExtend(),
      DefineOptions(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      // mock服务配置
      viteMockServe({
        // 保证开发阶段可以使用mock接口
        localEnabled: command === "serve"
      })
    ],
    resolve: { alias: { "@": path.resolve("./src") } },
    css: {
      // css预解析配置
      preprocessorOptions: {
        // scss全局变量一个配置
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTUyNERcdTdBRUZcXFxcanNcdThCRkVcdTdBMEJcXFxcXHU4MUVBXHU2MjExXHU1QjY2XHU0RTYwXFxcXFZVRVx1NEUxM1x1NzUyOFx1NjU4N1x1NEVGNlx1NTkzOVxcXFxWVUUzXFxcXHZ1ZTNfYmFzaWNcXFxcdnVlM19hZG1pbl90ZW1wbGF0ZVxcXFx2dWUzLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTUyNERcdTdBRUZcXFxcanNcdThCRkVcdTdBMEJcXFxcXHU4MUVBXHU2MjExXHU1QjY2XHU0RTYwXFxcXFZVRVx1NEUxM1x1NzUyOFx1NjU4N1x1NEVGNlx1NTkzOVxcXFxWVUUzXFxcXHZ1ZTNfYmFzaWNcXFxcdnVlM19hZG1pbl90ZW1wbGF0ZVxcXFx2dWUzLWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTUlODklOEQlRTclQUIlQUYvanMlRTglQUYlQkUlRTclQTglOEIvJUU4JTg3JUFBJUU2JTg4JTkxJUU1JUFEJUE2JUU0JUI5JUEwL1ZVRSVFNCVCOCU5MyVFNyU5NCVBOCVFNiU5NiU4NyVFNCVCQiVCNiVFNSVBNCVCOS9WVUUzL3Z1ZTNfYmFzaWMvdnVlM19hZG1pbl90ZW1wbGF0ZS92dWUzLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7LypcbiAqIEBBdXRob3I6IHtiYWl4aWFvfVxuICogQHZlcnNpb246XG4gKiBARGF0ZTogMjAyNS0wMi0xNCAwOTo0NDozOVxuICogQExhc3RFZGl0b3JzOiB7YmFpeGlhb31cbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjUtMDItMTcgMTY6MTA6MjJcbiAqIEBEZXNjcmlwdGlvbjpcbiAqL1xuaW1wb3J0IHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnRXhwb3J0LCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG4vL0B0cy1leHBlY3QtZXJyb3JcbmltcG9ydCBEZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJ1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuLy8gXHU1RjE1XHU1MTY1c3ZnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCwgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnRXhwb3J0ID0+IHtcbiAgLy8gXHU4M0I3XHU1M0Q2XHU1NDA0XHU3OUNEXHU3M0FGXHU1ODgzXHU0RTBCXHU1QkY5XHU1RTk0XHU3Njg0XHU1M0Q4XHU5MUNGXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcblxuICByZXR1cm4ge1xuICAgIGJhc2U6ICcuLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcbiAgICAgIERlZmluZU9wdGlvbnMoKSxcbiAgICAgIHZ1ZSgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgICAgLy8gbW9ja1x1NjcwRFx1NTJBMVx1OTE0RFx1N0Y2RVxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIC8vIFx1NEZERFx1OEJDMVx1NUYwMFx1NTNEMVx1OTYzNlx1NkJCNVx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOG1vY2tcdTYzQTVcdTUzRTNcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7IGFsaWFzOiB7ICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpIH0gfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIGNzc1x1OTg4NFx1ODlFM1x1Njc5MFx1OTE0RFx1N0Y2RVxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICAvLyBzY3NzXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU0RTAwXHU0RTJBXHU5MTREXHU3RjZFXG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfU0VSVkUsXG4gICAgICAgICAgLy8gXHU5NzAwXHU4OTgxXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFRQSxTQUFzQyxlQUFlO0FBQ3JELE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLHFCQUFxQjtBQUU5QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFVBQVU7QUFFakIsU0FBUyw0QkFBNEI7QUFJckMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQW1DO0FBRWpFLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFdkMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDbkMsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsY0FBYztBQUFBO0FBQUEsUUFFWixjQUFjLFlBQVk7QUFBQSxNQUM1QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLEtBQUssUUFBUSxPQUFPLEVBQUUsRUFBRTtBQUFBLElBQ2pELEtBQUs7QUFBQTtBQUFBLE1BRUgscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBLFVBQ3ZCLFFBQVEsSUFBSTtBQUFBO0FBQUEsVUFFWixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
