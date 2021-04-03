import svelte from "rollup-plugin-svelte";
import pkg from "./package.json";

export default [
  {
    input: "dist/index.svelte.js",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es" },
    ],
    external: ["svelte/internal", ...Object.keys(pkg.dependencies)],
    plugins: [svelte()],
  },
];
