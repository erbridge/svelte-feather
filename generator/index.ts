/// <reference path="./modules.d.ts" />

import feather from "feather-icons";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmdirSync,
  writeFileSync,
} from "fs";
import { pascalCase } from "pascal-case";
import path from "path";
import prettier from "prettier";
import * as prettierPluginSvelte from "prettier-plugin-svelte";

const OUTPUT_PATH = path.join(__dirname, "..", "src");
const OUTPUT_INDEX_PATH = path.join(OUTPUT_PATH, "index.js");
const TEMPLATE_PATH = path.join(__dirname, "template.svelte");

if (existsSync(OUTPUT_PATH)) {
  rmdirSync(OUTPUT_PATH, { recursive: true });
}

mkdirSync(OUTPUT_PATH, { recursive: true });

const template = readFileSync(TEMPLATE_PATH, "utf8");

let index = "";

for (const icon of Object.values(feather.icons)) {
  const componentName = pascalCase(icon.name).replace(/_(\d+)$/, "$1");

  const component = template
    .replace(/{attrs}/g, JSON.stringify(icon.attrs))
    .replace(/{content}/g, icon.toString())
    .replace(/\/\/ prettier-ignore/g, "");
  const prettyComponent = prettier.format(component, {
    plugins: [prettierPluginSvelte],
    parser: "svelte",
  });

  writeFileSync(
    path.join(OUTPUT_PATH, `${componentName}.svelte`),
    prettyComponent
  );

  index += `export { default as ${componentName} } from "./${componentName}.svelte";`;
}

const prettyIndex = prettier.format(index, { filepath: OUTPUT_INDEX_PATH });

writeFileSync(OUTPUT_INDEX_PATH, prettyIndex);
