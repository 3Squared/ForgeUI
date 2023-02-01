# Welcome to Forge UI!

![alt](https://cdn.3sq.app/assets/products/forge-ui/images/logo.svg)

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

5. You now need to register your component in the main entry file.

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

### Tips For Tree Shaking

Most of the leg work for making tree shaking work is already in place - there are just two things you need to make sure you do:

- In your Vue SFC make sure you include the PURE annotation via
  ```
  export const MyComponent = /*#__PURE__*/ Vue.extend({..
  ```
- When you install a new dependency, make sure to externalize it via the `external` section in `rollup.config.js`.

## Documenting your new component

Please consult `docs/README.md` on how you should document your new component and add examples to test it's functionality!

# Publishing a new version

To publish a new version of Forge UI Framework please open a PR targeting the `main` branch and the GitHub Action will take care of the rest!

