# Welcome to Forge UI!

![alt](https://cdn.3sq.app/assets/products/forge-ui/images/logo.svg)

### Contents:

1. Repository setup
2. Building Forge UI Framework
3. Running the styleguide to test your components
4. Adding a new component
5. Publishing a new version

# Repository setup

When you first clone forge to your machine you will want to run the following command to make sure all the necessary dependencies are installed. This could take a few minutes.

```
npm install
```

# Building Forge UI Framework

Forge UI Framework Version 5 uses a combination of `Rollup` and `Vite` to create an `esm` bundle for each component in the library and a central entry point as well other items such as types and styles. It is vital an `esm` bundle is created so the consuming application can utilise tree shaking.

To run the build process which includes theme generation, web type generation, icon generation, bundle generation and tree shaking checks; run:

```
npm run build
```

Note: `agadoo` may fail if your bundle is not tree shakeable - please consult 'Adding a new component' for some tips and tricks.

# Running the styleguide to test your components

Differently to previous versions, the documentation for the components now lives in a separate `/docs` directory - where we have pages for each of the components instead of everything living in the `/src` directory.

To enter the `/docs` project first run:

```
cd docs
```

And then run the following if it your first time running the styleguide:

```
npm install
```

The styleguide links directly to your components in the `/src` directory meaning you can benefit from hot reloading to test and develop your components. Run the following command to boot up the development server:

```
npm run dev
```

# Adding a new component

## Adding a new component in the `/src` directory

1. Decide which category your new component should come under in `/src/components`. (Forms, Layout, General etc)

2. Create a new folder in the relevant category with a descriptive name. For example if we wanted to create a location picker for the form:

```
src/
   components/
      forms/
         location-picker/
```

3. Inside your new folder create a Vue SFC (Single File Component) with a relevant name. Here is a template to get you started that will mean tree shaking will be supported out the box.

```
location-picker/
   LocationPicker.vue
```

```vue
<template>
  <h1>Hello, world!</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export const MyComponent = /*#__PURE__*/ Vue.extend({
  name: 'MyComponent'
});
export default MyComponent;
</script>
```

4. Develop your component with all the features you require, creating a subfolder of components or helpers if you need.

5. You now need to register your component in the main entry file, and optionally include it in the legacy ForgeUI plugin.

Go to `index.ts` and import, export and optionally register your new component.

```ts
// Import it
import ForgeLocationPicker from './src/components/forms/location-picker/LocationPicker.vue';

...

// Optionally register it
const ForgeUI = {
  install(Vue: VueConstructor) {
    ...
    registerComponent(ForgeLocationPicker);
    ...
  }
};

...

// Export it
export {
   ...
   ForgeLocationPicker
   ...
}
```

Note: With the introduction of Forge UI Framework Version 5, we now are going to advice against using the Forge UI plugin as it prevents tree-shaking from occurring in the consuming app, however we have kept it in so adoption can be gradual and there are no breaking changes - therefore it is optional to register your component in the plugin for people who want the component but haven't moved away from old-style consumption yet.

### Tips For Tree Shaking

Most of the leg work for making tree shaking work is already in place - there are just two things you need to make sure you do:

- In your Vue SFC make sure you include the PURE annotation via
  ```
  export const MyComponent = /*#__PURE__*/ Vue.extend({..
  ```
- When you install a new dependency, make sure to externalize it via the `external` section in `rollup.config.js`.

Any other problems, please don't be afraid to shout up because tree shaking can be a bit 🤯🤯, Tom Smith (tom.smith@3squared.com) and Dom Barter (dom.barter@3squared.com) are good places to start!

## Documenting your new component

Please consult `docs/README.md` on how you should document your new component and add examples to test it's functionality!

# Publishing a new version

To publish a new version of Forge UI Framework please open a PR targeting the `main` branch and the Azure Pipelines will take care of the rest!
