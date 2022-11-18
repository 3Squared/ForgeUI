import { ComponentDoc } from 'vue-docgen-api'
import { RenderedUsage} from "vue-docgen-cli";

export default function component(
    renderedUsage: RenderedUsage, // props, events, methods and slots documentation rendered
    doc: ComponentDoc, // the object returned by vue-docgen-api
): // a sub-component or does the current component have subcomponents
    string {
    const { docsBlocks } = doc
    return `
<details class="my-2 mb-4">
<summary>Props / Slots / Events </summary>
<div class="px-4">
<br/>

          ${renderedUsage.props}
          ${renderedUsage.methods}
          ${renderedUsage.events}
          ${renderedUsage.slots}
          ${docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : ''}
<hr/>

</div>
</details>

  `
}
