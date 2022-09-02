#  MultiSelect

<slot name="OPTIONS" />

<br/>

<slot name="example"/>

### Themeable with variant

<slot name="example2"/>

### Can display validation

<slot name="example3"/>

### Typescript Support

Use this type for your options

```typescript
import { MultiSelectOption } from '@3squared/forge-ui';
```

## Mapping DTO to Required id and label values

When returning your custom dto objects and they don't match the id and label fields, you can use the map function to assign your object fields to the required MultiSelectOption, in this case the id is a number.

The first line is a service call that will return a custom dto type, the second like creates the required MultiSelectOption that the multi-select will then use.

```typescript
const users = await MyService.GetUsers();
this.users = users.map(x => ({ id: x.userId, label: x.displayName } as MultiSelectOption<number>));
```

### Further examples can be found on Vue MultiSelect Website

<details><summary>View options</summary>

<iframe id="theFrame" src="https://vue-multiselect.js.org/#sub-getting-started" style="width:100%; height:800px" frameborder="0"></iframe>

</details>
