/*
  DEPRECATED: This script is no longer used.
  
  Stories are now co-located with components in dist/lib/components/**
  instead of having a separate dist/lib/stories directory.
  
  Original purpose:
  Generate a dist/lib/stories folder containing:
  - One re-export file per component story (e.g., Alert.stories.js) that re-exports from compiled story next to the component
  - An index.js that re-exports all stories

  This preserves separation: compiled TS outputs for stories remain under dist/lib/components/**
  while consumers can import from @gmzh/react-ui/stories and @gmzh/react-ui/stories/*
*/
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const COMPONENTS_DIR = path.join(DIST_DIR, 'lib', 'components');
const STORIES_OUT_DIR = path.join(DIST_DIR, 'lib', 'stories');
const STORIES_JS_REGEX = /\.stories\.js$/;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Validate story base names and produce safe export identifiers
const SAFE_PATH_NAME_REGEX = /^[A-Za-z0-9_-]+$/;
function isSafePathName(name) {
  return SAFE_PATH_NAME_REGEX.test(name);
}

function toSafeIdentifier(name) {
  let alias = name.replace(/-/g, '_');
  if (/^[0-9]/.test(alias)) alias = '_' + alias;
  return alias;
}

function moduleSpecifierWithoutJsExtension(specifier) {
  // Normalize to module id without file extension for TS declaration re-exports
  return specifier.replace(/\.(mjs|cjs|js)$/i, '');
}

function scanForStoryModules() {
  const storyFiles = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (STORIES_JS_REGEX.test(entry.name)) {
        storyFiles.push(full);
      }
    }
  }
  if (fs.existsSync(COMPONENTS_DIR)) walk(COMPONENTS_DIR);
  return storyFiles;
}

function relativeStoryImportPath(absFile) {
  // Create import path relative to STORIES_OUT_DIR index files
  const relFromDist = path.relative(path.join(DIST_DIR, 'lib'), absFile); // e.g., components/Alert/Alert.stories.js
  // We will import like: ../components/Alert/Alert.stories.js from stories dir
  const importPathFromStories = '../' + relFromDist.replace(/\\/g, '/');
  return importPathFromStories;
}

function build() {
  ensureDir(STORIES_OUT_DIR);

  const storyFiles = scanForStoryModules();

  const named = [];
  for (const absFile of storyFiles) {
    const base = path.basename(absFile); // Alert.stories.js
    const baseNoExt = base.replace(/\.stories\.js$/, ''); // Alert
    const outFile = path.join(STORIES_OUT_DIR, `${base}`); // Alert.stories.js
    const typesOutFile = path.join(STORIES_OUT_DIR, `${base.replace(/\.js$/, '.d.ts')}`);
    const importTarget = relativeStoryImportPath(absFile);

    const content = `export * from '${importTarget}';\nexport { default } from '${importTarget}';\n`;
    fs.writeFileSync(outFile, content);
    // Minimal .d.ts stub to aid TS resolution for re-exports
    const moduleId = moduleSpecifierWithoutJsExtension(importTarget);
    const dts = `export * from '${moduleId}';\nimport defaultExport from '${moduleId}';\nexport default defaultExport;\n`;
    fs.writeFileSync(typesOutFile, dts);

    const rawName = base.replace(/\.stories\.js$/, '');
    if (!isSafePathName(rawName)) {
      console.warn(`Skipping unsafe story name: ${rawName}`);
      continue;
    }
    const exportAlias = toSafeIdentifier(rawName);
    named.push({ rawName, exportAlias });
  }

  // Build index.js aggregating named re-exports
  const indexJs = named
    .map(({ rawName, exportAlias }) => `export * as ${exportAlias} from './${rawName}.stories.js';`)
    .join('\n');
  fs.writeFileSync(path.join(STORIES_OUT_DIR, 'index.js'), indexJs + (indexJs ? '\n' : ''));

  // Basic index.d.ts
  const indexDts = named
    .map(({ rawName, exportAlias }) => `export * as ${exportAlias} from './${rawName}.stories';`)
    .join('\n');
  fs.writeFileSync(path.join(STORIES_OUT_DIR, 'index.d.ts'), indexDts + (indexDts ? '\n' : ''));
}

// build();
// console.log('Built dist/lib/stories index and proxies');
console.log('DEPRECATED: This script is no longer used. Stories are co-located with components.');
