<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name     | Description                                                                                                               | Type                          | Values                                                                   | Default  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------ | -------- |
| name          | The name to use in the input and label                                                                                    | string                        | -                                                                        | null     |
| type          | The type of filter that should be used for the header                                                                     | string                        | `string`, `number`, `select`, `multiSelect`, `date`, `dateRange`, `time` | 'string' |
| value         |                                                                                                                           | string\|array\|object\|number | -                                                                        | null     |
| options       |                                                                                                                           | array                         | -                                                                        | []       |
| debounceTimer | How long to wait before actually searching, better for server side searching where you don't want to search each keypress | number                        | -                                                                        | 750      |
| config        |                                                                                                                           | object                        | -                                                                        | () => {} |
| variant       |                                                                                                                           | string                        | -                                                                        | 'brand'  |
| placeholder   |                                                                                                                           | string                        | -                                                                        | null     |
| hideLabel     |                                                                                                                           | boolean                       | -                                                                        | false    |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |
| reset      |            |

          ---

<hr/>

</div>
</details>
