<template>
  <div
      key="_bv-icons-table_"
      aria-labelledby="bv-icons-table-title"
      class="bv-icons-table notranslate"
      role="group"
  >
    <b-row class="">
      <b-col cols="12">
        <b-button v-b-toggle.examples class="mb-3" variant="link">Example usage</b-button>

        <b-collapse id="examples">
          <div v-b-toggle.forgeExample class="btn btn-link w-100 text-left pt-2 pb-1 px-3 text-light bg-brand mb-1">
            <h5 class="">ForgeUI Icon Example</h5>
          </div>

          <b-collapse id="forgeExample">
<!--            <Demo :code="exampleCode2" :component="example2" />-->
          </b-collapse>

          <div v-b-toggle.bootstrapExample class="btn btn-link w-100 text-left pt-2 pb-1 px-3 text-light bg-secondary mb-4">
            <h5>Bootstrap Icon Example</h5>
          </div>

          <b-collapse id="bootstrapExample">
<!--            <Demo :code="exampleCode" :component="example" />-->
          </b-collapse>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row align-v="start">
      <b-col class="mb-4" cols="12">
        <b-form @submit.prevent>
          <b-form-group
              :description="`Showing ${filteredIcons.length} of ${allIcons.length} icons`"
              label-align-sm="right"
              label-cols-sm="auto"
              label-for="bv-icons-table-search"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                  id="bv-icons-table-search"
                  key="_bv-icons-table-search_"
                  v-model="iconFilter"
                  aria-controls="bv-icons-table-result"
                  autocomplete="off"
                  debounce="250"
                  placeholder="Search all Icons"
                  type="search"></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <p class="text-center lead mb-4 font-italic">Try clicking on an icon!</p>

    <div id="bv-icons-table-result">
      <div v-if="filteredIcons.filter(i => i.name.startsWith('forge')).length > 0 " class="mb-4">
        <h4 class="border-bottom pb-3">ForgeUI Icons:</h4>
      </div>
      <transition-group
          class="row flex-row justify-content-center row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 row-cols-xxl-10 list-unstyled"
          name="flip-icon-list"
          tag="ul"
      >
        <b-col
            v-for="icon in filteredIcons.filter(i => i.name.startsWith('forge'))"
            :key="`_icon_${icon.name}`"
            :class="{isHovered : icon.isHovering}"
            class="flip-icon-list-icon d-inline-flex flex-column mb-4 text-center mb-5 icon-size hover:cursor-pointer"
            tag="li"
            @mouseleave="icon.isHovering = false"

            @mouseover="icon.isHovering = true"
        >
          <b-card
              :class="{iconHoverSize: icon.isHovering}"
              bg-variant="light"
              class="mx-auto border-0"
              no-body
              @click="clickedIcon(icon)">
            <b-icon :id="icon.name" :icon="icon.name" variant="primary"></b-icon>
          </b-card>
          <b-form-text :title="icon.name" class="mt-2 text-break">{{ icon.name }}</b-form-text>
          <b-button variant="link" @click="downloadSvg(icon)">Download</b-button>
        </b-col>
      </transition-group>
      <div v-if="filteredIcons.filter(i => !i.name.startsWith('forge')).length > 0 ">
        <div class="mb-5 mt-2">
          <h4 class="border-bottom pb-3">Bootstrap Icons:</h4>
        </div>
        <transition-group
            class="row flex-row justify-content-center row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 row-cols-xxl-10 list-unstyled"
            name="flip-icon-list"
            tag="ul"
        >
          <b-col
              v-for="icon in filteredIcons.filter(i => !i.name.startsWith('forge'))"
              :key="`_icon_${icon.name}`"
              :class="{isHovered : icon.isHovering}"
              class="flip-icon-list-icon d-inline-flex flex-column mb-4 text-center mb-5 icon-size"
              tag="li"
              @mouseleave="icon.isHovering = false"
              @mouseover="icon.isHovering = true"
          >


            <b-card
                :class="{iconHoverSize: icon.isHovering}"
                bg-variant="light"
                class="mx-auto border-0"
                no-body
                @click="clickedIcon(icon)">
              <b-icon :id="icon.name" :icon="icon.name" variant="primary"></b-icon>
            </b-card>
            <b-form-text :title="icon.name" class="mt-2 text-break">{{ icon.name }}</b-form-text>
            <b-button variant="link" @click="downloadSvg(icon)">Download</b-button>
          </b-col>
        </transition-group>
      </div>


      <div aria-atomic="true" aria-live="polite">
        <b-alert
            :aria-atomic="null"
            :aria-live="null"
            :role="null"
            :show="filteredIcons.length === 0"
            class="text-center mt-4 d-flex align-items-center justify-content-center"
            fade
            variant="light"
        >
          <b-icon aria-hidden="true" icon="alert-triangle-fill"></b-icon>
          <span>No matching icons found. Try searching again.</span>
        </b-alert>
      </div>
    </div>
    <p class="text-center">Use the search to search all {{ allIcons.length }} icons, or view all at <a href="https://bootstrap-vue.org/docs/icons#icons" target="_blank">Bootstrap Icons</a></p>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
//@ts-ignore
import { bootstrapIcons, forgeIcons } from "../../assets/iconNames";


import Example from "./examples/bootstrapExample.vue";
import ExampleCode from "./examples/bootstrapExample.vue?raw"

import Example2 from "./examples/forgeExample.vue";
import ExampleCode2 from "./examples/forgeExample.vue?raw"

import { ForgeIcon, ForgeIcons, ForgeToasts } from "@3squared/forge-ui";
import { BAlert, BButton, BCard, BCol, BCollapse, BForm, BFormGroup, BFormInput, BFormText, BIcon, BInputGroup, BInputGroupPrepend, BootstrapVueIcons, BRow, VBToggle } from 'bootstrap-vue';

Vue.use(BootstrapVueIcons);
Vue.use(ForgeIcons);
Vue.use(ForgeToasts);

export default defineComponent({
  name: 'BVIconsTable',
  components: { BRow, BCol, BForm, BFormGroup, BInputGroup, BInputGroupPrepend, BFormInput, BIcon, BCard, BFormText, BAlert, BCollapse, BButton },
  directives: { 'b-toggle': VBToggle },
  data() {
    return {
      loadedIcons: [] as Array<ForgeIcon>,
      allIcons: [] as Array<ForgeIcon>,
      iconFilter: '',
    }
  },
  methods: {
    clickedIcon(icon: ForgeIcon) {
      let copy = '<b-icon-' + icon.name + ' variant=\'brand\' />';
      navigator.clipboard.writeText(copy);
      this.$forgeToast('success', `Copied ${icon.name}`);
    },
    downloadSvg(icon: ForgeIcon | BIcon) {
      const svg = document.getElementById(icon.name)!.outerHTML
      let a = document.createElement('a')
      a.href = window.URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      a.download = `${icon.name}.svg`
      a.click()
      a.remove()
    }
  },

  computed: {
    filteredIcons(): Array<ForgeIcon> {
      if (this.loadedIcons) {
        const terms = this.iconFilter
            .trim()
            .toLowerCase()
            .split(/\s+/)
        if (terms[0].length === 0) {
          return this.loadedIcons;
        }
        return this.allIcons.filter((icon: ForgeIcon) => terms.every((term: string) => icon.name.indexOf(term) !== -1))
      }
      return [];
    },
    exampleCode(): string {
      return ExampleCode;
    },
    example(): unknown {
      return Example;
    },
    exampleCode2(): string {
      return ExampleCode2;
    },
    example2(): unknown {
      return Example2;
    }
  },

  beforeMount() {
    this.loadedIcons = [...forgeIcons
        .sort()
        .map((forgeIcon: string) => {
          return {
            component: forgeIcon,
            name: forgeIcon
                .replace(/^BIcon/, '')
                .replace(/\B([A-Z])/g, '-$1')
                .toLowerCase(),
            isHovering: false,
            isForge: true
          }
        })]

    this.loadedIcons.push(...[...bootstrapIcons
        .slice(0, 25)
        .sort()
        .map((bootstrapIcon: string) => {
          return {
            component: bootstrapIcon,
            name: bootstrapIcon
                .replace(/^BIcon/, '')
                .replace(/\B([A-Z])/g, '-$1')
                .toLowerCase(),
            isHovering: false,
            isForge: false
          }
        })])
  },

  mounted() {
    this.allIcons = [...this.loadedIcons];
    this.allIcons.push(...[...bootstrapIcons
        .slice(25)
        .sort()
        .map((bootstrapIcon: string) => {
          return {
            component: bootstrapIcon,
            name: bootstrapIcon
                .replace(/^BIcon/, '')
                .replace(/\B([A-Z])/g, '-$1')
                .toLowerCase(),
            isHovering: false,
            isForge: false
          }
        })])
  }
})
</script>

<style scoped>
.icon-size {
  font-size: 16px;
  padding: 5px;
}

.isHovered {
  background: #eee;
  cursor: pointer;
}

.iconHoverSize {
  transform: scale(175%, 175%);
}
</style>
