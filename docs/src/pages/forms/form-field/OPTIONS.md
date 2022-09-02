<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name   | Description                                                                                                                                  | Type                   | Values | Default      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ | ------------ |
| label       |                                                                                                                                              | string                 | -      |              |
| rules       | A list of rules that you want applied to the input from vee-validate                                                                         | string                 | -      | () => ''     |
| value       |                                                                                                                                              | string\|number\|object | -      | () => null   |
| type        | The input type e.g ['text', 'number', 'email', 'password', 'search', 'url', 'tel', 'date', 'time', 'range', 'color', 'checkbox', 'textarea'] | string                 | -      | () => 'text' |
| disabled    |                                                                                                                                              | boolean                | -      | () => false  |
| vid         | You can override the id of the element if you need it for server side validation                                                             | string                 | -      | () => null   |
| placeholder |                                                                                                                                              | string                 | -      | () => ''     |
| groupClass  |                                                                                                                                              | string                 | -      | () => ''     |
| labelCols   |                                                                                                                                              | string\|boolean        | -      | () => false  |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

          ---

<hr/>

</div>
</details>
