# Table

<slot name="OPTIONS" />

### Forge Table Configuration

The Forge Table is designed to handle all of your table needs in a easily configurable manner

There are two main concepts to working with a table they are the **fields** and **items**

#### Fields

This is an array of objects that describes the configuration of the table columns, such as labels, sorting, and styling

it takes an Array of objects like this the type can be imported like this

```js
import { ForgeTableField } from '@3squared/forge-ui';
```

<details>
<summary class="h5 mt-5">ForgeTableField</summary>

```typescript
export interface ForgeTableField {
  label?: string; // The Label you wish to see in the column header
  headerTitle?: string;
  headerAbbr?: string;
  class?: string | string[];
  formatter?: string | BvTableFormatterCallback;
  sortable?: boolean;
  sortDirection?: BvTableSortDirection;
  sortByFormatted?: boolean | BvTableFormatterCallback;
  filterByFormatted?: boolean | BvTableFormatterCallback;
  tdClass?: string | string[] | ((value: any, key: string, item: any) => any);
  thClass?: string | string[];
  thStyle?: any;
  variant?: BvTableVariant | string;
  tdAttr?: any | ((value: any, key: string, item: any) => any);
  thAttr?: any | ((value: any, key: string, item: any, type: string) => any);
  stickyColumn?: boolean;
  isRowHeader?: boolean;
  required?: boolean; // Whether or not it can be hidden by the column customiser
  autoFilter?: boolean; // Should it use auto filtering instead of manaual , see below
  filterType?: autoFilterType; // What type of filter is it? string or number
}
```

</details>

There are two ways to create the fields array, either by typing it out, or using the ForgeColumnBuilder

note both these methods produce the same result

<details><summary class="h5 mb-5">Creating Fields</summary>

```typescript
fields: [
  { key: 'id', sortable: true, autoFilter: true, filterType: 'number' },
  { key: 'last_name', sortable: true, autoFilter: true, filterType: 'string' },
  { key: 'first_name', sortable: true, autoFilter: true, filterType: 'string' },
  { key: 'age', sortable: true, autoFilter: true, filterType: 'number' },
  { key: 'dateJoined', sortable: true },
  { key: 'actions', required: true }
];
```

vs

```typescript
return new ForgeColumnBuilder()
  .addColumn('id', (col) => col.enableAutoFilter('number'))
  .addColumn('last_name', (col) => col.enableAutoFilter())
  .addColumn('first_name', (col) => col.enableAutoFilter())
  .addColumn('age', (col) => col.enableAutoFilter('number'))
  .addColumn('dateJoined')
  .addColumn('actions', (col) => col.disableSorting())
  .build();
```

The benefit of the column builder is that its fully typesafe and more discoverable

</details>

#### Items

This is the data of the table it can be provided in a couple of ways, as either

- An array of the data you want to display
- A Function that returns the data you want to display (e.g async call)

#### Notes

Forge Tables have the following Defaults set

- showEmpty: true,
- striped: true,
- hover: true,
- fixed: true,
- bordered: true,
- noSortReset: true

To read about that these do look here https://bootstrap-vue.org/docs/components/table#comp-ref-b-table

### Typescript Support

If you are using TypeScript then you can import these types.

Single Columns

Field Array Columns

```typescript
import { ForgeTableFieldArray } from '@3squared/forge-ui';
```

They are what each column field is defined as. So not the rows but the columns such as the below column definitions.

```typescript
fields: [
  { key: 'id', sortable: true, autoFilter: true, filterType: 'number' },
  { key: 'last_name', sortable: true, autoFilter: true, filterType: 'string' },
  { key: 'first_name', sortable: true, autoFilter: true, filterType: 'string' },
  { key: 'age', sortable: true, autoFilter: true, filterType: 'number' },
  { key: 'dateJoined', sortable: true },
  { key: 'actions', required: true }
] as ForgeTableFieldArray;
```

This is the basic Forge Table implementation. It contains the following client-side features:

- Sorting
- Paging
- Filtering

### Client-side Table

A client side table does the sorting and filtering all in the browser. This means that all the data needs to be sent to
this in order to work. The advantages are that is will be more responsive. You need to be aware that if you have lots of
rows, say thousands then it may be best to use a server side one.

<slot name="example"/>

### Server-side Table

A server side table does the sorting and filtering on the server, this means that the server is responsible for sorting
and serving up a page at a time. The advantages are that it will handle tables with lots more data as it only needs a
page of data at a time. The disadvantages are that it will be less responsive, as it's not all done on the client side.
This should be used if you know you will have lots of rows to display at some point.

<slot name="example2"/>

### Failure Examples

If your table is using the server side data fetching all error handling will be handled automatically see below

If you are using a client side table you will need to catch the error yourself and provide it to the tableErrorProp

<slot name="example3"/>

### Sticky Header with Scroll

The header stays fixed in place and the content can be scrolled.

<slot name="example4"/>

### Not Sticky to the Page

The header is not fixed in place.

<slot name="example5"/>

## Filtering

Filtering is the means of getting the context of the current forge-table and what you want to filter on, this being
columns or an ordering of columns.

### Specifying Page size

If you want to specify the number of row to display, you can specify it as follows, where perPage is a data value.

```typescript
:perPage="perPage"
```

```typescript
data() {
  return {
    perPage: 10
  }
```

### Getting Paging Data

If you are paging the data then you will need to be aware of the context object that will be passed into your getItems
method (or whatever you have called it). Note that this is a typescript example but should help if not using typescript
as well.

```typescript
  methods: {
    async getItems(context: BvTableCtxObject)
    {
    }
```

If using TypeScript then you can add BvTableCtxObject as follows

```typescript
import { BvTableCtxObject } from 'bootstrap-vue';
```

The BvTableCtxObject contains the following values that we are normally interested in

```typescript
currentPage: number;
perPage: number;
sortBy: string | null;
sortDesc: boolean;
```

You could then use it something like this example. Note that we populate a custom object with these values and then send
them onwards to make an api request.

```typescript
methods: {
  async getItems(context: BvTableCtxObject): Promise <Array<LineManagerDto>> {
    const pagingParams:  LineManagerParametersDto = {
    pageSize: context.perPage,
    pageNumber: context.currentPage,
    sortDesc: context.sortDesc,
    orderBy: context.sortBy
  };
  const items = await LineManagerService.getLineManagers(pagingParams);
  return items;
},
```

### Getting Filter Data

Filters are what can be used to pass to the backend or handle locally to filter the data based on what the user is searching for in a column header.

```typescript
@clearFilters="clearFilters"
:filters.sync="filters"
```

The filters in this forge table were as follows, note that the names of the filters match the key name. When someone enters a value in the foreName Header that filter value of foreName will be populated with the value the user entered.

```typescript
data() {
  return {
    fields: [
      { key: 'userId', sortable: true, autoFilter: true, filterType: 'number'},
      { key: 'foreName', sortable: true, autoFilter: true, filterType: 'string'},
      { key: 'surname', sortable: true, autoFilter: false, filterType: 'string'},
      { key: 'numberOfUsers', sortable: true, autoFilter: false, filterType: 'number'}
    ] as ForgeTableFieldArray,
    filters: {
      userId: null as number | null,
      foreName: null as string | null,
      surname: null as string | null,
      numberOfUsers: null as number | null
    }
  }
}
```

The clear filter methods is just used to reset the values

```typescript
clearFilters() {
  this.filters.userId = null;
  this.filters.foreName = null;
  this.filters.surname = null;
  this.filters.numberOfUsers = null;
}
```

These filter values can then be used in your code, for example passed into the ajax request that requests the data from the server. This can then be handled on the server and return the filtered data.
The example below build on the paging one and passes in these filters.

```typescript
 async getItems(context: BvTableCtxObject): Promise<Array<LineManagerDto>> {
  const pagingParams: LineManagerParametersDto = {
    pageSize: context.perPage,
    pageNumber: context.currentPage,
    sortDesc: context.sortDesc,
    orderBy: context.sortBy,
    userId: this.filters.userId,
    foreName: this.filters.foreName,
    surname: this.filters.surname
  };
  const items = await LineManagerService.getLineManagers(pagingParams);
  return items;
}
```

### Toggleable Columns

You can dynamically hide or show columns by altering the forge column builder

<slot name="example6"/>

### TD Attributes

Setting the TD attributes let you have full control of the TD styling

<slot name="example7"/>

### Legacy Pagination Footer

In Forge v5 a new pagination design was introduced that changed the design of the pagination footer, if you would still like to use the old table design - pass the `legacy-pagination-footer` prop into the table.

<slot name="example8"/>

### Disable Pagination

In some scenarios you may want to remove the automatic pagination feature and display all your items in one go, without the option of splitting it into pages. You can do this by making sure you **don't pass a value for the `total` prop (or pass -1)**. You can still apply custom sorting and filtering.

**Please note:** In this example we have limited the total number of items to 10, so it doesn't fill the screen, but if you were to remove this hard-coded limit, the full 50 results would all display on one page.

<slot name="example9"/>

### Automatic Column Widths

The table is set to have equal column widths by default - however you may have content that has a large range of sizes - in which case variable width columns might make more sense. You can do this by applying the `auto-column-width` prop.

**Please note:** If you have this prop enabled, you can pass percentage widths to your columns, instead of fixed widths - this allows you to slightly tweak the widths generated automatically by the browser - whilst still remaining adaptive at smaller screen sizes. You can see this in the example below.

<slot name="example10"/>
