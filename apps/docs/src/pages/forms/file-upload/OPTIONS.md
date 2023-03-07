<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name         | Description                                               | Type                                            | Values | Default                      |
|-------------------|-----------------------------------------------------------|-------------------------------------------------|--------|------------------------------|
| placeholder       |                                                           | string                                          | -      | () => 'Browse your computer' |
| getFileUrlAction  |                                                           | (fileName: string) => Promise<[string, string]> | -      |                              |
| autoUploadToBlob  |                                                           | boolean                                         | -      | true                         |
| acceptedFileTypes |                                                           | string                                          | -      |                              |
| maxFileSize       |                                                           | number                                          | -      |                              |
| multiple          |                                                           | boolean                                         | -      | true                         |
| maxFileInput      |                                                           | number                                          | -      | null                         |       
| editableFileName  | Makes file name an inline editable field                  | boolean                                         | -      | false                        |       
| validateFileName  | Validate file name when editable file name is set to true | (fileName: string) => Promise<ValidationResult> |        |                              |

## Events

| Event name | Properties | Description |
|------------|------------|-------------|
| input      |            |

## Slots

| Name    | Description | Bindings |
|---------|-------------|----------|
| message |             |          |

          ---

<hr/>

</div>
</details>
