<template>
  <div>
    <forge-page-header title="Chart" />
    <p>Documentation and examples can be found in the <a class="link" target="_blank" href="https://saforgestyleguide.z33.web.core.windows.net/#/general/alert/alert"><strong>Forge.UI documentation</strong></a> or the <a class="link" target="_blank" href="https://www.chartjs.org/docs/latest/"><strong>Chart.js documentation</strong></a> as shown below.</p>
    <iframe name="Chart.js Documentation" src="https://www.chartjs.org/docs/latest/" class="iframe"/>
  </div>
</template>

<script setup lang="ts">
import { ForgePageHeader } from '@3squared/forge-ui'
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 700px
}
</style>