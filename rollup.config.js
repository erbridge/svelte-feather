import del from "rollup-plugin-delete";
import svelte from "rollup-plugin-svelte";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es" },
    ],
    external: ["svelte/internal", ...Object.keys(pkg.dependencies)],
    plugins: [del({ targets: "dist" }), svelte()],
  },
];
