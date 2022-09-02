const path = require('path')
const comp = require('./docgen-templates/component.js').default;

// Files you want to ignore
const ignoreFiles = ['PaginationHeader', 'TableColumnCustomiser', 'PaginationFooter']
// Folders you want to ignore relative to './src/components'
const ignoreEntireFolders = ['trains/terminal-map/components']

module.exports = {
    
    componentsRoot: './src/components', // the folder where CLI will start searching for components.
    components: `./(?!${ignoreEntireFolders.join('|')})**/(?!${ignoreFiles.join('|')})[A-Z]*.vue`, // the glob to define what files should be documented as components (relative to componentRoot)
    outDir: './docs/src/pages', // folder to save components docs in (relative to the current working directry)
    getDestFile: (file, config) => {
        const parts = file.split('/')
        parts.splice(-1)
        return path.join(config.outDir, parts.join('/') + '/OPTIONS.md') // specify the name of the output md file
    },
    templates: {
        // global component template wrapping all others see #templates
        component: comp,
    },
}