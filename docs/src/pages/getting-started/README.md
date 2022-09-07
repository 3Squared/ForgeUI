<br />

# Getting Started With Forge UI Framework Version 5!

This getting started guide will give a comprehensive guide of how to install ForgeUI into your app, please consult the component pages for detailed examples of how to use each component.

---

## Step 1 - Add the ForgeUI registry to your `.npmrc`

The ForgeUI library is not public, and it only accessible by members of 3squared, therefore you need to add a private registry to your `.npmrc`:

```npmrc
@forge:registry=https://pkgs.dev.azure.com/threesquared/_packaging/3sq_npm/npm/registry/
```

---

## Step 2 - Install ForgeUI!

You now want to install the latest version of ForgeUI to your application.

```bash
npm install @3squared/forge-ui
```

<br />
You may find that you have to generate a personal access token for this artifacts registry if you receive a 401 error - which can be generated using:

```bash
npx vsts-npm-auth -config .npmrc -F
```

---

## Step 3 - Register and use the components

You must register your ForgeUI and BootstrapVue components in each SFC, so that tree-shaking knows exactly what you are using:

```markup
<template>
  <div>
    <b-button>A button</b-button>
    <forge-footer version="2.3.0" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ForgeFooter } from '@3squared/forge-ui';
import { BButton } from 'bootstrap-vue';

export default Vue.extend({
  components: { ForgeFooter, BButton }
});
</script>
```

<br />

This may not be what you are used to, as in versions prior to v5 you would have a ForgeUI plugin in your entry file, and this would make all the ForgeUI components and BootstrapVue components globally accessible; meaning you didn't have to hand register them. **In v5 you can still use this plugin, however we advise against using it** as it means tree-shaking cannot take place because you are registering every component regardless of if you will use it or not.

If you'd like to use the legacy ForgeUI plugin, place these lines in your entry file (e.g. `index.ts`):

```js
import ForgeUI from '@3squared/forge-ui';

Vue.use(ForgeUI);
```

---

## Step 4 - Import your theme

The final step is to import your required theme, do this in your entry file (e.g. `index.ts`), replacing your theme for whichever you want:

```js
import '@3squared/forge-ui/dist/themes/onyx.css';
```

<br />

However, you may also want to import the `scss` version of the style to make amendments (or if you wanted to import multiple stylesheets into one single scss file). You can do this by getting the `scss` version of your theme:

```scss
@import '~@3squared/forge-ui/src/styles/themes/onyx.scss';
```

---

## Step 5 - Run your application!

All being well - you should now be able to start your application up and start seeing your ForgeUI and BootstrapVue components showing up, and if you're not using the legacy plugin - you should also see a dramatic reduction in bundle size compared to previous versions of ForgeUI.

<br />
<br />
