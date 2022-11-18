<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name   | Description                                                                                                     | Type    | Values | Default            |
| ----------- | --------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------------------ |
| onSubmit    | Pass a function to call when the form is submited so Forge form can display a loading spinner and handle errors | func    | -      |                    |
| showTitle   |                                                                                                                 | boolean | -      | true               |
| title       |                                                                                                                 | string  | -      | 'Forge Form Title' |
| hideCancel  |                                                                                                                 | boolean | -      | false              |
| submitText  |                                                                                                                 | string  | -      | 'Submit'           |
| loadingText |                                                                                                                 | string  | -      | ''                 |

## Events

| Event name | Properties | Description                                 |
| ---------- | ---------- | ------------------------------------------- |
| cancel     |            | Triggered when the cancel button is clicked |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| error   |             |          |
| default |             |          |
| cancel  |             |          |
| submit  |             |          |

          ---

<hr/>

</div>
</details>
