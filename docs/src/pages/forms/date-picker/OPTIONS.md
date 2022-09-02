<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

## Props

| Prop name        | Description                                                                                                                  | Type                        | Values | Default                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------ | ---------------------- |
| value            | Date class differentiates with normalizer<br/>Component is written with a normalizer to `string` for backwards compatability | object\|string\|array\|date | -      | null                   |
| config           | Flatpickr configuration options<br/>`@type` undefined                                                                        | flatpickr.Options.Options   | -      | () => ({} as Config)   |
| normalizer       | Converts library date instances to native Javascript Date objects<br/>`@type` undefined                                      | ForgeDatePickerNormalizer   | -      | () => stringNormalizer |
| state            | When set to false will show a validation icon similar to boostrap form controls                                              | boolean                     | -      | null                   |
| variant          | One of the standard theme variants e.g primary, secondary, brand                                                             | string                      | -      | 'brand'                |
| hideCalendarIcon | Hides the calendar icon and expands the input field                                                                          | boolean                     | -      | false                  |

## Events

| Event name | Properties                                                                                                                                                                                                                                       | Description                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| input      |                                                                                                                                                                                                                                                  |
| on-close   | **dates** `Date[]` - new value set<br/>**currentDateString** `string` - value that was set before the change<br/>**currentDateString** `string` - value that was set before the change<br/>**data** `any` - value that was set before the change | Triggers when the number changes |

## Slots

| Name   | Description                           | Bindings |
| ------ | ------------------------------------- | -------- |
| before | Content placed before the Date Picker |          |
| after  | Content placed after the Date Picker  |          |

          ---

<hr/>

</div>
</details>
