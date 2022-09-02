<template>
  <div class="about">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Changelog" active>
          <markdown-content />
        </b-tab>
        <b-tab title="About">
          <b-card-text>
            <h3>{{ packageInfo.name }}</h3>
            <h4>Version : {{ packageInfo.version }}</h4>
            <table class="table b-table table-striped table-hover table-bordered b-table-fixed">
              <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
              </tr>
              </thead>
              <tbody>
              <tr :key="name" v-for="(version, name) in packageInfo.dependencies">
                <td>{{ name }}</td>
                <td>{{ version }}</td>
              </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script lang="ts">
import markdownContent from '../../../CHANGELOG.md';
import packageInfo from '../../package.json';

export default {
  name: 'AboutAndChangelogComponent',
  components: { markdownContent },
  computed: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    packageInfo() {
      return packageInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
.changelog {
  text-align: initial;
}
</style>
