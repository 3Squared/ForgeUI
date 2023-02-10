const {promisify} = require('util');
const fs = require('fs');
const glob = promisify(require('glob'));
const {parse} = require('vue-docgen-api');

function execShellCommand(cmd) {
 console.log(cmd);
 const exec = require('child_process').exec;
 return new Promise((resolve, reject) => {
  const res = exec(cmd, (error, stdout, stderr) => {
   if (error) {
    reject(error)
    console.warn(error);
   }
   resolve(stdout ? stdout : stderr);
  });

  res.stdout.pipe(process.stdout);
 });
}

const convertToKebabCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

const listComponents = async () => {
 // Glob for your components.
 return await glob('src/components/*/*/*.vue');
};

/**
 * Parses the component tags
 * @param {import('vue-docgen-api').ComponentDoc} component
 */
const parseTag = component => {
 const tag = {};
 if (component.props) {
  tag.attributes = component.props.map(prop => convertToKebabCase(prop.name));
 }
 tag.description = component.description || '';

 return tag;
};

/**
 * Parses the component tags
 * @param {String} componentTag
 * @param {import('vue-docgen-api').ComponentDoc} component
 */
const parseAttributes = (componentTag, component) => {
 const props = {};
 component.props.forEach(prop => {
  const propName = convertToKebabCase(prop.name);
  // eslint-disable-next-line no-multi-assign
  const propDoc = (props[`${componentTag}/${propName}`] = {});
  propDoc.description = prop.description || '';
  if (prop.type) {
   propDoc.type = prop.type.name;
  }
  if (prop.values) {
   propDoc.options = prop.values;
  }
 });

 return props;
};

const parseDocs = components => {
 const tags = {};
 let attributes = {};
 components.forEach(component => {
  if (!component.displayName.includes('Terminal')) {
   const componentName = `${component.displayName}`;
   const componentTag = convertToKebabCase(componentName);
   tags[componentTag] = parseTag(component);
   if (component.props) {
    attributes = {...parseAttributes(componentTag, component), ...attributes};
   }
  }
 });

 return [tags, attributes];
};

const baseComponents = {
 "ForgeModal": "BModal",
 "ForgeTable": "BTable",
 "ForgeForm": "BForm"
}

const gen = async () => {
 //Create jet brains types
 await execShellCommand('npx vue-docgen-web-types --c scripts/config.js');

 //Load bootstrap vue types and merge with Forge
 const bootstrapWebTypes = JSON.parse(fs.readFileSync('../../node_modules/bootstrap-vue/dist/web-types.json'));
 const forgeWebTypes = JSON.parse(fs.readFileSync('dist/web-types.json'))
 forgeWebTypes.contributions.html.tags.map(t => {
  const bootstrapTags = baseComponents[t.name];
  if (bootstrapTags) {
   const foundTags = bootstrapWebTypes.contributions.html['vue-components'].find(t => t.name === bootstrapTags)
   t.attributes = [...t.attributes, ...foundTags.props]
   t.slots = [...t.slots, ...foundTags.slots]
  }
 })

 fs.writeFileSync('dist/web-types.json', JSON.stringify(forgeWebTypes, null, 2));

 //Get bootstrap types for Vetur
 let bootstrapTags = JSON.parse(fs.readFileSync('../../node_modules/bootstrap-vue/dist/vetur-tags.json'));
 let bootstrapAttributes = JSON.parse(fs.readFileSync('../../node_modules/bootstrap-vue/dist/vetur-attributes.json'));

 const components = await listComponents();
 const componentDocsPromises = components.map(c => parse(c, bootstrapTags, bootstrapAttributes));
 const docs = await Promise.all(componentDocsPromises);
 const [tags, attributes] = parseDocs(docs);
 fs.writeFileSync('dist/vetur-tags.json', JSON.stringify({...tags, ...bootstrapTags}, null, 2));
 fs.writeFileSync('dist/vetur-attributes.json', JSON.stringify({...attributes, ...bootstrapAttributes}, null, 2));
};

gen();