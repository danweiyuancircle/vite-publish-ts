# 1、实现目标

写一个ts库，然后使用vue项目对ts进行测试。项目采用vite+ts+vue的接口，测试完成后将ts库发布到npm官方仓库。

# 2、模版工程实现步骤

## 2.1、配置 vite.config.ts，配置说明如下

```typescript
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    //构建为库模式，一般不包含vue的东西
    build: {
        lib: {
            // 指定打包的入口文件，依次作为依赖链条上的入口文件，没有在这个依赖链上的文件，则不会被打包
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MyLib',  // 库名称，适用于 UMD 格式
            fileName: "my-lib"  // 输出文件名
        },
        rollupOptions: {
            // 排除依赖的变量，使用依赖方的变量，比如：vue
            external: [
                'vue',
            ],
            output: {
                // 将js打包输出包一个文件里面
                entryFileNames: 'index.js',
                // 指定模块为esm
                format: 'esm',
                globals: {
                    vue: 'Vue',  // Vue 的全局变量名，适用于 UMD 格式
                },
            },
        }
    },
    resolve: {
        // 打包将 "@"好替换成src
        alias: {
            "@": resolve(__dirname, "src"),
        },
        preserveSymlinks: true
    },
})

```

## 2.3、在src/index.ts 入口文件中添加导出内容。引入时，可以访问的都在此定义

```typescript
import {android} from "./bridge/android-bridge.ts";
import {BaseInfo} from "./bridge/base-bridge.ts";
import {testPerson} from "./bridge/test.ts";
import {dateUtils} from "./bridge/date-utils.ts";

export {android, BaseInfo, testPerson, dateUtils}
```

## 2.4、配置发布文件

```json
{
  "name": "vite-publish-ts",
  "private": false,
  "version": "1.0.5",
  //配置打包完成的入口文件
  "main": "dist/index.js",
  //配置打包完成的入口文件
  "module": "dist/index.js",
  //配置声明文件入口
  "types": "dist/index.d.ts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    //最后要加一下vue-tsc -b 来生成ts的.d.ts文件
    "build": "vue-tsc -b && vite build && vue-tsc -b",
    "preview": "vite preview",
    "publish": "npm publish"
  },
  //配置发布配置的镜像源地址
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
  // 指定npm publish发布时要包含的文件
  "files": [
    "dist/**/*.ts",
    "dist/**/*.ts.map",
    "dist/**/*.js"
  ],
  "dependencies": {
    "date-fns": "^4.1.0",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@vitejs/plugin-vue": "^5.2.1",
    "typescript": "~5.6.2",
    "vite": "^6.0.1",
    "vue-tsc": "^2.1.10"
  }
}
```

## 2.5、执行发布命令

npm publish
