"use strict";
exports.__esModule = true;
function component(renderedUsage, // props, events, methods and slots documentation rendered
doc) {
    var docsBlocks = doc.docsBlocks;
    return "\n<details class=\"my-2 mb-4\">\n<summary>Props / Slots / Events </summary>\n<div class=\"px-4\">\n<br/>\n\n          ".concat(renderedUsage.props, "\n          ").concat(renderedUsage.methods, "\n          ").concat(renderedUsage.events, "\n          ").concat(renderedUsage.slots, "\n          ").concat(docsBlocks ? '---\n' + docsBlocks.join('\n---\n') : '', "\n<hr/>\n\n</div>\n</details>\n\n  ");
}
exports["default"] = component;
