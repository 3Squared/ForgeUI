<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name              | Description                                                                         | Type                                | Values | Default         |
| ---------------------- | ----------------------------------------------------------------------------------- | ----------------------------------- | ------ | --------------- |
| total                  |                                                                                     | number                              | -      | -1              |
| stickToPage            |                                                                                     | boolean                             | -      | true            |
| fields                 |                                                                                     | Array as () => ForgeTableFieldArray | -      |                 |
| showColumnCustomiser   | Enables the column customiser                                                       | boolean                             | -      | () => false     |
| showExporter           |                                                                                     | boolean                             | -      | () => false     |
| filters                |                                                                                     | object                              | -      | () => {}        |
| tableError             |                                                                                     | string\|object                      | -      | () => null      |
| clearColumn            | Allows you to customise which column you want the clear filters button to appear in | string                              | -      | () => 'actions' |
| exportItemsFunc        |                                                                                     | () => any[]                         | -      | null            |
| stacked                |                                                                                     | boolean\|string                     | -      |                 |
| legacyPaginationFooter |                                                                                     | boolean                             | -      | false           |
| autoColumnWidth        |                                                                                     | boolean                             | -      | false           |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:filters    |            |
| clearFilters      |            |
| update:tableError |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

          ---

<hr/>

</div>
</details>
