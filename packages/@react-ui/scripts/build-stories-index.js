/*
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

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function scanForStoryModules() {
  const storyFiles = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.stories\.js$/.test(entry.name)) {
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
    const dts = `export * from '${importTarget.replace(
      /\.js$/,
      '',
    )}';\nimport defaultExport from '${importTarget.replace(
      /\.js$/,
      '',
    )}';\nexport default defaultExport;\n`;
    fs.writeFileSync(typesOutFile, dts);

    named.push(base.replace(/\.stories\.js$/, ''));
  }

  // Build index.js aggregating named re-exports
  const indexJs = named
    .map((name) => `export * as ${name} from './${name}.stories.js';`)
    .join('\n');
  fs.writeFileSync(path.join(STORIES_OUT_DIR, 'index.js'), indexJs + (indexJs ? '\n' : ''));

  // Basic index.d.ts
  const indexDts = named.map((name) => `export * as ${name} from './${name}.stories';`).join('\n');
  fs.writeFileSync(path.join(STORIES_OUT_DIR, 'index.d.ts'), indexDts + (indexDts ? '\n' : ''));
}

build();
console.log('Built dist/lib/stories index and proxies');
