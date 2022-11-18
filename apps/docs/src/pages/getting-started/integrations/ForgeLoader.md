<br/>

# Integrate your WebForms project with Vue.js using Forge.Loader

Forge.Loader is a class library project that will help the developer combine their WebForms project with a Vue.js project combined of multiple different pages/components designed to be mounted in different places across the parent application.

Once integrated, Forge.Loader will seamlessly detect Vue.js chunks and conditionally load them based on the configuration your provide.

#### Where can I find Forge.Loader?

You can find the source code at: https://dev.azure.com/threesquared/Forge/_git/Forge.Loader.

The package is available on our `forge-nuget` Artifacts registry at: https://dev.azure.com/threesquared/Forge/_artifacts/feed/forge-nuget

<br/>

<details>
    <summary style="font-size:2em; font-weight: 500;">
        Step 1: Setup your Vue.js project to support multiple entry points
    </summary>

First of all the Vue.js project needs rearchitecting to create multiple different components, that each have different mounting points. Previously you may have had a single bundle that mounted multiple things or supported a whole site - we're going to break this down so that the performance will be much better.

Consider your Vue.js project as linking to a collection of mounting points:

```text
SearchResults -> <div id="vue-search-results"></div>

PerformanceGraph -> <div id="vue-perf-graph"></div>

Footer -> <div id="vue-footer"></div>

Navbar -> <div id="vue-navbar"></div>
```

<br/>

We need a different 'chunk' for each of those components. That way if we only need the `SearchResults` and the `Footer` on a given page we only need to load those 2 chunks.

We now need to consider how we generally tell which chunks should be loaded on which pages; we can make tweaks using the configuration, but if we know a given component represents a given a page - we should structure it like so to begin with.

**This is the ideal structure for a project with some shared components, and some components that are destined to be used specifically on `Home.aspx` and `Account/Details.aspx`.**

```text
src/
    pages/
        Account/
            Details/
                Details.vue
                entry.ts
        Home/
            Home.vue
            entry.js
        Layout/
            Footer/
                Footer.vue
                entry.ts
            Navbar/
                Navbar.vue
                entry.ts

```

<br/>

When compiled using the following config it will produce this `dist` folder:

```text
dist/
    Account/
        Details.abc.js
    Layout/
        Footer.abc.js
        Navbar.abc.js
    chunk-common.abc.js
    chunk-vendors.abc.js
    Home.abc.js
```

<br/>

Each `entry.ts` file is like a mini `main.ts` file - where you can choose your mounting point, import any themes etc. E.g.

```ts
import Vue from 'vue';
import Footer from './Footer.vue';

require('theme.scss');

new Vue({
  el: '#vue-footer',
  render: (h) => h(Footer)
});
```

<br/>

And this is the configuration you need to add to `vue.config.js` to make this compilation step work:

```js
const fg = require('fast-glob');

const getPages = () => {
  const PageComponentDirectory = './src/pages'; // Where the bundle entry points are under
  const EntryPointFileNames = ['entry.js', 'entry.ts']; // The name of the entry points

  const pages = {};

  // Loop through all the files under /page to find all entry files
  for (const entryPointFileName of EntryPointFileNames) {
    const EntryPointPattern = `${PageComponentDirectory}/**/${entryPointFileName}`; // Recursive depth pattern
    for (const entryPath of fg.sync(EntryPointPattern)) {
      const pageName = entryPath.replace(PageComponentDirectory, '.').replace('/' + entryPointFileName, '');

      // Create a new entry
      pages[pageName] = {
        entry: entryPath
      };
    }
  }

  return pages;
};

const pages = getPages();

...

module.exports = {
    pages,

    ...

    chainWebpack: config => {
        Object.keys(pages).forEach(page => {
            config.plugins.delete(`html-${page}`);
            config.plugins.delete(`preload-${page}`);
            config.plugins.delete(`prefetch-${page}`);
        });
    },
}
```

</details>

<br />

<details>
    <summary style="font-size:2em; font-weight: 500;">
        Step 2: Add Forge.Loader to your Master page
    </summary>

Install Forge.Loader as a NuGet package to your project. Then add the following lines to your Master page (code behind):

```csharp
protected class ForgeLoaderContextProvider : IContextProvider
{
    private HttpContext Context => HttpContext.Current;
    public string ConvertServerPathToLocalPath(string path) => Context.Server.MapPath(path);
    public string ConvertServerPathToWebPath(string path) => VirtualPathUtility.ToAbsolute(path);
    public string GetAppRelativeWebPath() => Context.Request.AppRelativeCurrentExecutionFilePath;
}

protected IForgeLoader ForgeLoader = new ForgeLoader(new ForgeLoaderContextProvider());
```

<br/>

Then add the following line inside your Master page, within the head section. This will generate the script and style imports required for the currently requested page (You may need to place it within a `telerik:RadCodeBlock`).

```html
<head>
  <%= ForgeLoader.GenerateImports() %>
</head>
```

</details>

<br />

<details>
    <summary style="font-size:2em; font-weight: 500;">
        Step 3: Customise Forge.Loader to load exactly what we need
    </summary>

By default, Forge.Loader is configured to:

- Search for a dist folder at `~/vue/dist`
- Load files matching `chunk-*` on every page
- Load chunks matching a reduced version of the url (see below)

So if we visit `Home.aspx`, our `<head>` will contain:

```html
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS START -->
<link href="chunk-common.css" rel="stylesheet" />
<script src="chunk-common.js" defer></script>
<script src="chunk-vendors.js" defer></script>
<script src="Home.js" defer></script>
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS END -->
```

And then if we visit `Account/Details.aspx`, our `<head>` will contain:

```html
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS START -->
<link href="chunk-common.css" rel="stylesheet" />
<script src="chunk-common.js" defer></script>
<script src="chunk-vendors.js" defer></script>
<script src="Account/Details.js" defer></script>
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS END -->
```

<br />

You've probably figured out that the loader will automatically match the current URL to chunks in the dist folder.
E.g.

- mydomain.com/Home.aspx -> Home.js
- mydomain.com/Account/Details.aspx -> Account/Details.js

**This is why structuring your vue project correctly is really important - so the directory matches the URLs.**

Now let's add in our Footer chunk on every page:

```csharp
protected IForgeLoader ForgeLoader = new ForgeLoader(new ForgeLoaderContextProvider(), new LoaderConfiguration
{
    AutoIncludedDirectories = new List<string> { "chunk-*", "Layout/Footer" }
});
```

```html
<!-- mydomain.com/Account/Details.aspx -->
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS START -->
<link href="chunk-common.css" rel="stylesheet" />
<script src="chunk-common.js" defer></script>
<script src="chunk-vendors.js" defer></script>
<script src="Account/Details.js" defer></script>
<script src="Layout/Footer.js" defer></script>
<!-- [Forge.Loader]: AUTO-GENERATED IMPORTS END -->
```

<br />

We can also configure the Forge Loader to load things conditionally - based on matched URLs.
This example will only load the Navbar on pages that are under `Account/`. You can match more than 1 alias in a given request.

```csharp
protected IForgeLoader ForgeLoader = new ForgeLoader(new ForgeLoaderContextProvider(), new LoaderConfiguration
{
    VueAliases = new Dictionary<Regex, string>
    {
        { new Regex("^Account/.*$"), "layout/Navbar" }
    },
});
```

<br />

And finally, you can change the dist folder location like so:

```csharp
protected IForgeLoader ForgeLoader = new ForgeLoader(new ForgeLoaderContextProvider(), new LoaderConfiguration
{
    VueDistLocation = "~/my/dist/location"
});
```

</details>

<br />

<details>
    <summary style="font-size:2em; font-weight: 500;">
        Step 4: Don't forget your mounting points!
    </summary>

You've now setup the loader so that it pulls in the correct scripts, don't forget to put your mounting points into the relevant pages.

For example, `mydomain.com/Account/Details.aspx`:

```html
<body>
  <div id="vue-navbar"></div>
  <div id="vue-account-details"></div>
  <div id="vue-footer"></div>
</body>
```

<br/>

**Please note:** The mounting point IDs are not set by Forge.Loader and instead need to be set in the `entry.ts` files.

</details>

<br />
<br />

If you need any further help, Forge.Loader has been fully implemented in DFH - so go talk to one of the team and they should be able to point you in the right direction!

<br />
<br />
<br />
