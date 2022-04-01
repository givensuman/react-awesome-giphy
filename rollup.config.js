import typescript from "rollup-plugin-typescript2"
import css from "rollup-plugin-import-css"
import pkg from "./package.json"

export default [
  {
    input: "src/index.tsx",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript({
        typescript: require("typescript")
      }),
      css()
    ],
    output: [
      {
        file: 'dist/index.js',
        format: 'umd',
        name: 'index',
        sourcemap: 'inline',
      },
    ],
  }
]