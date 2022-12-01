# Welcome to Forge Playground version 1!

### Contents:

1. Repository setup
2. Building Forge Playground
3. Publishing a new version

# Repository setup

When you first clone Forge Playground to your machine you will want to run the following command to make sure all
the necessary dependencies are installed. This could take a few minutes.

```
npm install
```

# Building Forge Playground

Forge Playground Version 1 uses a combination of `Rollup` and `Vite` to create an `esm` bundle 
for the package and a central entry point as well other items such as types and styles. 

To run the build process run:

```
npm run build
```

# Publishing a new version

Once you are happy with the changes you have made to the playground, please open a PR targeting the `main` branch and the build pipeline will take care of the rest!
