# How to document your component using the new Style Guide! 

This is a guide for adding your new ForgeUI component to the style-guide with examples.

___

### Contents:

- [Initial folder structure setup](#initial-folder-structure-setup)
- [Creating the navigation link](#creating-the-navigation-link)
- [How do component examples work?](#how-do-component-examples-work)
- [Using the README](#using-the-readme)
- [Considerations](#considerations)
  - [Linking straight to Markdown](#linking-straight-to-markdown)
  - [Using the options API for our component pages](#using-the-options-api-for-our-component-pages)

___


## Initial folder structure setup:

You'll want to create a new page for your new component, you can do this by simply creating
a subdirectory in the relevant category for your component. 

For example, if your component
belongs to the **forms** category of components then you would create your
new subdirectory here: 

```
./src/pages/forms/[your-new-component-name]
```  

Then within that new directory, create another subdirectory called examples - this will hold all your examples you want to show for your component.

The final step is to create the `README.md` for documenting that component and the `YourNewComponent.vue` 
file for glueing it all together.

If you've done everything right so far, your folder structure should look something like this:
```
src    
│
└───forms
│   └───your-new-component-name
│   │   │   examples
│   │   │   YourNewComponent.vue
│   │   │   README.md
│   │...
│... 
```
*Please keep to naming your .md file as README - It's called that for automation purposes.*

___

## Creating the navigation link:

The route mapping is automated within the style-guide, there's no need to mess around with the vue-router
which is why it's important we stick to the folder structure above. 

However we still need to display a link of some sort within the UI so a user can click it and
be taken to your new page.

To do this we need to head to:

```
./src/components/TheNavBar.vue
```  

This is a navigation component, all we need to do is add a `b-dropdown-item` where we want our components link
to display, following this example, since we are adding a form component, it would go within: 

```vue
<b-nav-item-dropdown text="Forms">
```

So it might look like this:

```vue
<b-nav-item-dropdown text="Forms">
    <b-dropdown-item :to="{ name: 'forms-your-new-component-name-YourNewComponent' }">
        New Forms Component
    </b-dropdown-item>
    
    <!--  other form nav-bar links   -->

</b-nav-item-dropdown>
```

In the **name** for the route, you would replace the **your-new-component-name** with the folder name
you created, and you would replace the **YourNewComponent** with the name of the Vue page you created.

If you're struggling here go to your Vue dev tools in chrome and look at your routes, you can search for your folder
you created within there, and find the name of the route. 

Doing things this way gives you the flexibility to order your links however you please.

All being well, you should now be able to go to the Forms dropdown link on the Navbar now and see
the name of your new component... 

Clicking it will take you to something like this:
```
http://localhost:3000/#/forms/your-new-component-name/yournewcomponent
```

If that's all working, you've got fully functioning routing! All we need to do is flesh out that page with 
some context and examples of your component.

___

## How do component examples work?
To create an example simply create a Vue component within that examples directory
(throughout the rest of the style guide examples are named `example, example2, example3`)
within this example we will need to make sure it relies on as little Bootstrap 
and Forge as possible to support **Tree Shaking**, also make sure to extend Vue
in order for TypeScript to recognise it as a Vue component and run its type checking.

An example might look like this:

```vue
<template>
  <div>
    <forge-inline-editor v-model="exampleValue" />
    <label>Output : {{ exampleValue }} </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ForgeInlineEditor } from '@3squared/forge-ui';

export default Vue.extend({
  components: { ForgeInlineEditor },
  data() {
    return {
      exampleValue: null
    };
  }
});
</script>
```

Create as many examples as necessary in order to demonstrate the varying functionalities of your
component - Maybe how it functions with different props passed in etc...

Now that we have created our example components we can import them into the our Vue page by
making use of the **Demo** component.

In the component pages themselves we make use of `<script setup>` from the
[Vue Composition API](https://vuejs.org/api/sfc-script-setup.html).

It might look something like this:

```vue
<script setup>
// importing the demo component
import Demo from '../../../components/Demo.vue';

// importing our examples
import Example from './examples/Example.vue';
import ExampleCode from './examples/Example.vue?raw';

import Example2 from './examples/Example2.vue';
import ExampleCode2 from './examples/Example2.vue?raw';
</script>
```

Then within the `<template>` we can reference our examples like so:
```vue
<Demo :component="Example" :code="ExampleCode" />
<Demo :component="Example2" :code="ExampleCode2" />
```

At this point you should be able to navigate to your component page via your link in the Nav
we created in the section above and view your demo components, we're pretty much there,
we just need to add a bit of context, this is where the `README` comes into play.

Your folder structure will look something like this:
```
src    
│
└───forms
│   └───your-new-component-name
│   │   │   examples
│   │   │       │   Example.vue
│   │   │       │   Example2.vue
│   │   │       │   ...
│   │   │       
│   │   │   YourNewComponent.vue
│   │   │   README.md
│   │...
│...
```

___

## Using the README
We're using a Markdown `README` file to add context to our pages, this makes it easier to read
from within the IDE, and easy to change / modify in the future, also keeps a bit of consistency 
across all the different pages in the style-guide.

To transform what we created in the section above, we're going to use **slots** for our demo components
within our `README.md`. 

Here's what the Checkbox's component page `README` looks like:

```
# Form Checkbox Inputs

> For cross browser consistency, `<b-form-checkbox-group>` and `<b-form-checkbox>` use Bootstrap's
> custom checkbox input to replace the browser default checkbox input. It is built on top of
> semantic and accessible markup, so it is a solid replacement for the default checkbox input.

**Example 1:** Single checkbox

<slot name="example"/>

**Example 2:** Multiple choice checkboxes

<slot name="example2"/>
```

So we write our context using standard markdown, then we use these slot tags:

```vue
<slot name="example"/>
```

wherever we're going to want our demo components to show.

Once we're happy with it, we can modify our component page we created above like so:

```vue
<template>
  <README>
    <template #example>
      <Demo :code="ExampleCode" :component="Example" />
    </template>

    <template #example2>
      <Demo :code="ExampleCode2" :component="Example2" />
    </template>
  </README>
</template>

<script setup>
import README from './README.md';
import Demo from '../../../components/Demo.vue';

import Example from "./examples/Example.vue";
import ExampleCode from "./examples/Example.vue?raw"

import Example2 from "./examples/Example2.vue";
import ExampleCode2 from "./examples/Example2.vue?raw"
</script>
```

Using the slot name shorthand **#** when referencing our slot names from the readme. 

At this point you should have a nice looking page on the Style Guide for your new
component with examples. 😎👍

If you've hit a wall at any point through this guide, join the
[ForgeUI Slack Channel](https://3squared.slack.com/archives/C02E74HV3JQ),
but before you do, take a look at the extra considerations below.

___

## Considerations

### Linking straight to Markdown
If we're not interested in creating a component page with examples, but we still
want to create a page on the Style Guide and link to it through the Nav,
we can simply create a Markdown file of the page, and add it to the `TheNavBar.vue`
component like we did here:
[Creating the navigation link](#creating-the-navigation-link).

**DO NOT** call it `README.md` - if you are doing this!

This is because the search on the style guide ignores all README.md files as they 
are supposed to be for fleshing out the Vue pages, whereas in this instance there
is no corresponding Vue page, we are just linking directly to the Markdown.

### Using the options API for our component pages
So for whatever reason, you want to use the options API for defining your component
page, instead of the way shown above in the guide that uses the composition API
way of doing things with the `<script setup>` tags.

First of all - don't do this. There are only very specific reasons for you
to do this and it's due to us using the composition API within Vue 2.

Anyway, if you need to do this, here is how you would do it whilst retaining 
your demo component functionality:


```vue
<template>
  <README>
    <template #example>
      <Demo :code="exampleCode" :component="example" />
    </template>

    <template #example2>
      <Demo :code="exampleCode2" :component="example2" />
    </template>
  </README>
</template>

<script lang="ts">
import README from './README.md';
import Demo from '../../../components/Demo.vue';

import Example from './examples/Example.vue';
import ExampleCode from './examples/Example.vue?raw';

import Example2 from './examples/Example2.vue';
import ExampleCode2 from './examples/Example2.vue?raw';

export default {
  components: {README, Demo},

  computed: {
    exampleCode() {
      return ExampleCode;
    },
    example() {
      return Example;
    },
    exampleCode2() {
      return ExampleCode2;
    },
    example2() {
      return Example2;
    }
  }
}
</script>
```

