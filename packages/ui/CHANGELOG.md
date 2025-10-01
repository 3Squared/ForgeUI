# @3squared/forge-ui

## 1.12.1

### Patch Changes

- 47835b1: Fix missing prop on forge file upload for azure storage override

## 1.12.0

### Minor Changes

- 3e3da34: Add in the ability to be able to override the azure storage version ms-api-version header

## 1.11.0

### Minor Changes

- 05ce123: Updated the file mimetype definitions to use an external mime npm package, as bnrowsers do not like all file types. This was then upsetting the allowed file types by comparing an empty string, to the valid mime-types provided. The extra definitions should cater for a wider range of file types allowed.

## 1.10.0

### Minor Changes

- 78e7612: New prop to stepper component to completely hide backbutton

## 1.9.3

### Patch Changes

- 6c0e3c9: Fix uploader not passing content type to blob storage

## 1.9.2

### Patch Changes

- 2352b46: Pass all relevant props to textarea in forge-form-field

## 1.9.1

### Patch Changes

- bfe129e: Fix typings output

## 1.9.0

### Minor Changes

- 3dea70c: Added props for pagination on the table component for further customization

## 1.8.3

### Patch Changes

- bbd91ed: Update where types are declared in package.json

## 1.8.2

### Patch Changes

- 7a22a46: Add provider to vite config

## 1.8.1

### Patch Changes

- 0241e05: Fix Toggle All padding issue

## 1.8.0

### Minor Changes

- 284f905: Fix ordering issues with the TableColumnCustomiser

## 1.7.1

### Patch Changes

- 9c3c27e: Update ShowClearButton prop to default to false

## 1.7.0

### Minor Changes

- 86377bd: Add option to show clear filters button above the table

## 1.6.0

### Minor Changes

- d59148b: Added a new slot ot the forge table component which allows for extra buttons or other components to be added above the table (and next to pagination)

### Patch Changes

- dfef40d: remove preserve search as default multiselect
- 7da3033: File Uploader 'Browse Your Computer' Hover not working because the button wasn't hovered

## 1.5.0

### Minor Changes

- e6f964f: Add ConvertToMultiSelectOption helper method
- bd773fd: Added a prop to the file uploader to allow the File name to be editable

## 1.4.0

### Minor Changes

- e40f041: update all dependencies and setup renovate configuration
- 990e7c4: allow changing form title as props and override the title as slot

### Patch Changes

- c4f6090: This is a test summary to verify it all works
- af79ff5: chore(deps): update dependency vite-plugin-dts to v1.7.3
- dabb030: Add variant type configuration for loader
- c65969a: Ensure multiselect search disappears when all items are selected
