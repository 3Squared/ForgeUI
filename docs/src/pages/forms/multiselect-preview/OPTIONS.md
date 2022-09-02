<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name                | Description                                                                                                | Type                                              | Values                                          | Default          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- | ---------------- |
| title                    | The header text for the preview part                                                                       | string                                            | -                                               | 'Selected Items' |
| orientation              | The orientation of the multi select and preview part                                                       | String as () => MultiSelectPreviewOrientationType | `horizontal`, `vertical`, `horizontal-reversed` | 'horizontal'     |
| height                   | The hight that you want the preview part to be                                                             | string                                            | -                                               | '200px'          |
| items                    | The list of items to be displayed in the multi-select                                                      | Array as () => MultiSelectOption<unknown>[]       | -                                               |                  |
| v-model                  | The list of items that have been selected in the multi-select and hence also displayed in the preview part | Array as () => MultiSelectOption<any>[]           | -                                               |                  |
| canRemoveItemFromPreview | If set to false it will hide the cross in the preview part                                                 | boolean                                           | -                                               | true             |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |

## Slots

| Name               | Description                                                                                            | Bindings |
| ------------------ | ------------------------------------------------------------------------------------------------------ | -------- |
| default            |                                                                                                        |          |
| after-multi-select | If you need to display some content below the multi select such as validation content                  |          |
| list-item          | Use this slot if the default labels is not enough, maybe for a b-link to redirect the user to the item |          |

          ---

<hr/>

</div>
</details>
