/**
 * A build pipeline designed to build the forge library and perform
 *   any necessary checks / generation steps
 */

const shell = require("shelljs");

function exec(command) {
  console.log(command);
  return shell.exec(command);
}

class BuildPipeline {
  constructor() {
    this.functions = [];
  }

  generateComponentDocs() {
    this.functions.push(() => exec("npx vue-docgen -c scripts/docgen-config.ts"));
    return this;
  }


  generateIDEHelpers() {
    this.functions.push(() => exec("node ./scripts/generate-types.js"));
    return this;
  }

  compileUtilities() {
    this.functions.push(() => exec("tsc utilities/index.ts"));
    return this;
  }

  buildLibrary() {
    this.functions.push(() => exec("vite build"));
    return this;
  }

  testTreeshaking() {
    this.functions.push(() => exec("npm run is-tree-shakeable"));
    return this;
  }

  go() {
    for (const func of this.functions) {
      const result = func();
      if (result.code !== 0) {
        shell.exit(1);
      }
    }
  }
}

new BuildPipeline().generateComponentDocs().compileUtilities().buildLibrary().generateIDEHelpers().testTreeshaking().go();
