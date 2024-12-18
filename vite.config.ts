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
            // 排除指定文件，不让它们被打包
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
