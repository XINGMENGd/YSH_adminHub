//vite-env.d.ts

// /// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}
// // 环境变量 TypeScript的智能提示
// interface ImportMetaEnv {
//     VITE_APP_TITLE: string;
//     VITE_APP_PORT: string;
//     VITE_APP_BASE_API: string;
// }

// interface ImportMeta {
//     readonly env: ImportMetaEnv;
// }
//

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: string; // 环境
  readonly VITE_OUTPUT_DIR: string; // 打包目录
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}