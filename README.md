# ForgeTech

The monorepo of all ForgeTech

## What's inside?

This repository includes the following packages and apps:

### Apps and Packages

- `docs`: The Documentation site of ForgeUI https://3squared.github.io/ForgeUI/
- `ui`: Forge UI itself
- `playground`: Playground as an easy way to display and explore components in a  web browser
- `eslint-config-custom`: shared `eslint` configurations

### Install

`npm install` - This will install all the dependencies for all projects in the repository

### Dev

`npm run dev` - This will run the Docs site in dev mode with hot reloading

### Build

`npm run build` - This will build all packages and apps ready for release

### Test

`npm run test` - This will test all packages and apps ready for release

### Lint

`npm run lint` - This will lint all packages and apps

## Contributing

### Changesets
Changesets are a way of managing changes to your codebase in a structured and organized way. They allow you to group related changes into a single cohesive unit, which can then be reviewed, tested, and deployed as a single entity.

Changesets typically include one or more code changes, along with documentation updates, tests, and any other artifacts necessary to ensure the change is complete and correct. They include a description of the change along with a list of any relevant issues or pull requests that the change addresses.

To use changesets, you typically create a new branch or fork of your codebase, make your changes, and then commit them to the branch or fork. Once you have made all of your changes, you can then create a changeset, which will allow you to group all of the changes into a single cohesive unit.

### Linting
In order to fix linting errors you will need to make changes to your code to bring it into compliance with the rules or guidelines being enforced by your linter. This might involve correcting syntax errors, updating variable names, or making other changes to ensure that your code conforms to the expected style and conventions.

Some linting tools also provide automatic fixes for common issues which can be a helpful way to quickly resolve simple errors or violations. In more complex cases you may need to manually review and update your code to ensure that it meets the expected standards.

### Versioning

In this repository, we make use of [changesets](https://github.com/changesets/changesets) to version and publish the packages in this repository.
Please check [this](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) if you want to submit a PR and never heard of changesets before.