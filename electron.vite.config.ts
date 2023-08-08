import * as path from 'path';
import { promises as fs } from 'fs';
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite';
import type { ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import iconsResolver from 'unplugin-icons/resolver';
import iconsPlugin from 'unplugin-icons/vite';
import svgLoader from 'vite-svg-loader';
import { SVG, cleanupSVG, runSVGO } from '@iconify/tools';

function resolve(url = '', ...args: string[]) {
  return path.resolve(__dirname, url, ...args);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const { Icons, IconsResolver } = unpluginIconsPlugin();
  return {
    main: {
      root: '.',
      build: {
        rollupOptions: {
          input: resolve('./src/main/app.ts'),
        },
      },
      plugins: [externalizeDepsPlugin(), swcPlugin()],
      resolve: {
        alias: {
          '#common': resolve('./src/common'),
          $main: resolve('./src/main'),
        },
      },
      define: {},
    },
    preload: {
      root: '.',
      build: {
        rollupOptions: {
          input: {
            login: resolve('./src/preload/login.ts'),
          },
        },
      },
      plugins: [externalizeDepsPlugin()],
      resolve: {
        alias: {
          '#common': resolve('./src/common'),
        },
      },
      define: {},
    },
    renderer: {
      root: resolve('./src/renderer'),
      build: {
        rollupOptions: {
          input: {
            login: resolve('./src/renderer/login.html'),
          },
        },
      },
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: tag => {
                return ['webview'].includes(tag);
              },
            },
          },
          /**
           * vue 3.3版本中新增了对 defineOptions 的支持
           */
          script: {
            /**
             * 实验性语法支持：https://github.com/vuejs/rfcs/discussions/502
             * 开启 解构的 props 并保持响应性，并支持解构的方式设置别名及默认值
             */
            propsDestructure: true,
          },
        }),
        vueJsx({
          // exclude: [
          //   '**/chat-message/shared/components/editor/**/*.tsx',
          //   '**/chat-message/shared/components/editor/**/*.ts',
          // ],
        }),
        // https://blog.csdn.net/CRMEB/article/details/123245221
        Components({
          dts: resolve('./typings/autoimport-components.d.ts'),
          resolvers: [IconsResolver()],
        }),
        Icons(),
        svgLoader({
          svgo: false,
          defaultImport: 'url',
        }),
      ],
      server: {
        port: 8200,
        https: false,
        host: true,
        open: false,
      },
      css: {
        devSourcemap: true,
      },
      resolve: {
        alias: {
          '#common': resolve('./src/common'),
          '@pages': resolve('./src/renderer/pages'),
          '@shared': resolve('./src/renderer/shared'),
        },
      },
      define: {},
    },
  };
});

function unpluginIconsPlugin() {
  /**
   * https://github.com/svg/svgo
   * https://github1s.com/iconify/tools/blob/main/@iconify-demo/unplugin-svelte/vite.config.js
   * https://docs.iconify.design/articles/cleaning-up-icons/
   */
  const baseIconsPath = './src/renderer/shared/assets/icons';
  return {
    IconsResolver: () =>
      iconsResolver({
        prefix: 'icon',
        alias: {
          // 如果集合的名称比较长，我们可以定义集合的别名
          // svg: 'shared-app-svg',
          // 'fill-svg': 'shared-app-fill-svg',
        },
        // 写入自定义的icons集合名
        // customCollections: ['shared-app-svg-icon', 'shared-app-fill-svg-icon'],
        customCollections: ['svg', 'fill-svg'],
      }),
    Icons: () =>
      iconsPlugin({
        compiler: 'vue3',
        autoInstall: false,
        // 自定义图标加载
        customCollections: {
          // FileSystemIconLoader 用来处理svg文件
          // svg: FileSystemIconLoader(resolve(baseIconsPath, './svg'), svg => {
          //   return svg;
          // }),
          // 'fill-svg': FileSystemIconLoader(resolve(baseIconsPath, './fill-svg'), svg => {
          //   return svg;
          // }),
          svg: async name => {
            const path = resolve(baseIconsPath, './svg');
            const filename = `${path}/${name}.svg`;
            const content = await fs.readFile(filename, 'utf-8');
            const svg = new SVG(content);
            await cleanupSVG(svg);
            // 制作成纯色图标
            await runSVGO(svg, {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      convertColors: {
                        currentColor: true,
                      },
                    },
                  },
                },
                {
                  name: 'addClassesToSVGElement',
                  params: {
                    classNames: ['svg-icon'],
                  },
                },
              ],
            });
            return svg.toMinifiedString({ width: '1em', height: '1em' });
          },
          'fill-svg': async name => {
            const path = resolve(baseIconsPath, './fill-svg');
            const filename = `${path}/${name}.svg`;
            const content = await fs.readFile(filename, 'utf-8');
            const svg = new SVG(content);
            await cleanupSVG(svg);
            // 制作成纯色图标
            await runSVGO(svg, {
              plugins: [
                { name: 'preset-default' },
                {
                  name: 'addClassesToSVGElement',
                  params: {
                    classNames: ['svg-icon'],
                  },
                },
              ],
            });
            return svg.toMinifiedString({ width: '1em', height: '1em' });
          },
        },
      }),
  };
}
