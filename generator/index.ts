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

const OUTPUT_PATH = path.join(__dirname, "..", "dist");
const OUTPUT_COMPONENT_INDEX_PATH = path.join(OUTPUT_PATH, "index.svelte.js");
const OUTPUT_DECLARATION_INDEX_PATH = path.join(OUTPUT_PATH, "index.d.ts");
const COMPONENT_TEMPLATE_PATH = path.join(__dirname, "template.svelte");
const DECLARATION_TEMPLATE_PATH = path.join(__dirname, "template.svelte.d.ts");

if (existsSync(OUTPUT_PATH)) {
  rmdirSync(OUTPUT_PATH, { recursive: true });
}

mkdirSync(OUTPUT_PATH, { recursive: true });

const componentTemplate = readFileSync(COMPONENT_TEMPLATE_PATH, "utf8");
const declarationTemplate = readFileSync(DECLARATION_TEMPLATE_PATH, "utf8");

let componentIndex = "";
let declarationIndex = "";

for (const icon of Object.values(feather.icons)) {
  const componentName = pascalCase(icon.name).replace(/_(\d+)$/, "$1");

  const component = componentTemplate
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

  componentIndex += `export { default as ${componentName} } from "./${componentName}.svelte";`;

  const declaration = declarationTemplate.replace(
    /ComponentName/g,
    componentName
  );
  const prettyDeclaration = prettier.format(declaration, {
    parser: "typescript",
  });

  writeFileSync(
    path.join(OUTPUT_PATH, `${componentName}.svelte.d.ts`),
    prettyDeclaration
  );

  declarationIndex += `export { default as ${componentName} } from "./${componentName}.svelte";`;
}

const prettyComponentIndex = prettier.format(componentIndex, {
  filepath: OUTPUT_COMPONENT_INDEX_PATH,
});

writeFileSync(OUTPUT_COMPONENT_INDEX_PATH, prettyComponentIndex);

const prettyDeclarationIndex = prettier.format(declarationIndex, {
  filepath: OUTPUT_DECLARATION_INDEX_PATH,
});

writeFileSync(OUTPUT_DECLARATION_INDEX_PATH, prettyDeclarationIndex);
