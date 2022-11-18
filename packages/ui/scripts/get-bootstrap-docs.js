const fs = require('fs');
const glob = require('glob');
const replaceAll = require('string.prototype.replaceall');
const getDirectories = function(src, callback) {
  glob(src + '/**/*.md', callback);
};

// Add Iframe to real docs
// Allow custom comments above
// Have review process for documentation in sync


getDirectories('../node_modules/bootstrap-vue/src/components', function(err, res) {
  getDirectories('../src/components', (err, ours) => {
    res.forEach(r => {
      const [boostrapComp] = r.replace('../node_modules/bootstrap-vue/src/components/', '').split('/');

      const match = ours.find(o => {
        const name = o.substring(o.lastIndexOf('/') + 1);
        if (name.toUpperCase() !== 'README.MD') {
          return name.replace('.md', '').toUpperCase() === boostrapComp.toUpperCase();
        }
        return false;
      });
      if (match) {
        const f = fs.readFileSync(r, 'utf8');
        
        const htmlMatches = f.match(/```html.*?```/sg)
        let rewritten = f;

        const scriptMatches = f.match(/```js.*?```/sg)
        scriptMatches?.forEach(m => {
          //its a vue file
          if (m.includes('<script>') || m.includes("export default") || !m.includes('<')) {
            const after = m.replace('```js', '```md')
            rewritten = rewritten.replace(m, after)
          } else {
            const after = m.replace('```js', '```jsx')
            rewritten = rewritten.replace(m, after)
          }
        })
        
        
        htmlMatches.forEach(m => {
          //its a vue file
          if(m.includes('<template>')){
            const after = m.replace('```html', '```vue')
            rewritten = rewritten.replace(m,  after)
          }
          else{
            const after = m.replace('```html', '```jsx')
            rewritten = rewritten.replace(m, after)
          }
        })

       
      //  let rewritten = replaceAll(f, '```html', '```vue');
/*        rewritten = replaceAll(rewritten, '```js', '```html');*/
        rewritten = replaceAll(rewritten, 'light', 'brand');
        rewritten = replaceAll(rewritten, 'Light', 'Brand');
        rewritten = replaceAll(rewritten, 'text-brand', 'text-light');
        rewritten = replaceAll(rewritten, '`type-${type}`', '``');
        rewritten = rewritten.replace(/<!--(.*?)-->/g, '');
        fs.writeFileSync(match, rewritten);

        console.log('We MATCH on ' + match);
      }


    });
  });


  if (err) {
    console.log('Error', err);
  }
});