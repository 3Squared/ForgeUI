<br />

# Getting Started With Forge UI Framework!

This getting started guide will give a comprehensive guide of how to install ForgeUI into your app, please consult the component pages for detailed examples of how to use each component.

## Step 1 - Install ForgeUI!

You now want to install the latest version of ForgeUI to your application.

```bash
npm install @3squared/forge-ui
```
---

## Step 2 - Register and use the components

You must register your ForgeUI and BootstrapVue components in each SFC, so that tree-shaking knows exactly what you are using:

```markup
<template>
  <div>
    <forge-page-header title="ForgeUI!"/>
    <b-button>A button</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Forge } from '@3squared/forge-ui';
import { BButton } from 'bootstrap-vue';

export default Vue.extend({
  components: { ForgePageHeader, BButton }
});
</script>
```


## Or use the ForgeResolverPlugin inside your vite.config

```typescript
const forgeResolver = require("@3squared/forge-ui/utilities").forgeResolver;
export default defineConfig({
  plugins: [
    Components({
      resolvers: [forgeResolver()]
    }),
  ],
});
```

---

## Step 3 - Import the stylesheet

The final step is to import the required styling for the components, do this in your stylesheet (e.g. `style.scss`):

You have two real options when styling a forge app. Use a prebuilt theme or manually create a theme

### Option 1 Import the main theme

```scss
@import '@3squared/forge-ui/dist/styles/main.css';
```

### Option 2 Import the files individually so you can customise the variables


```scss
// Import the Forge UI variables
@import '~@3squared/forge-ui/src/styles/variables.scss';
$theme-colors: map-merge(
                $forge-theme,
                (
                        'primary': #41b883,
                        'success': #09ff00,
                        'danger': #ea0319
                )
);

$gray-1000: #262626;

//See this file for full list of options
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
$font-size-sm: 0.8rem;
$modal-md: 650px;
$body-color: #36454f;
@import '~@3squared/forge-ui/src/styles/forge.scss';

```
---

## Step 4 - Run your application!

All being well - you should now be able to start your application up and start seeing your ForgeUI and BootstrapVue components showing up.

<br />
<br />
