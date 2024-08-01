---
"@3squared/forge-ui": minor
---

Updated the file mimetype definitions to use an external mime npm package, as bnrowsers do not like all file types. This was then upsetting the allowed file types by comparing an empty string, to the valid mime-types provided. The extra definitions should cater for a wider range of file types allowed.
