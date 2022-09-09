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
---

## Step 3 - Import the stylesheet

The final step is to import the required styling for the components, do this in your stylesheet (e.g. `style.scss`):

```scss
@import '@3squared/forge-ui/dist/styles/main.css';
```

---

## Step 4 - Run your application!

All being well - you should now be able to start your application up and start seeing your ForgeUI and BootstrapVue components showing up.

<br />
<br />
