var sass = require('sass');
var fs = require('fs')


const buildStyles = () => {
 const outputDir = process.argv.slice(2)[0]
 console.log(`Building theme to put in ${outputDir}`)
 
 if(!fs.existsSync(`${outputDir}/styles`)) {
  fs.mkdirSync(`${outputDir}/styles`, {recursive: true})
 }
 
 sass.render({
    file: `./src/styles/main.scss`,
    sourceMap: true,
    outFile: "style.css",
    outputStyle: "compressed"
   },
   function (error, result) {
    if (!error) {
     fs.writeFile(`${outputDir}/styles/main.css`, result.css, () => {
     });
    } else {
     console.log(`${error}`)
    }
   });
}

buildStyles();