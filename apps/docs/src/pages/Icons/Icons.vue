<template>
  <div
      key="_bv-icons-table_"
      class="bv-icons-table notranslate"
      role="group"
      aria-labelledby="bv-icons-table-title"
  >
    <b-row class="">
      <b-col cols="12">
        <b-button v-b-toggle.examples variant="link" class="mb-3">Example usage</b-button>
        
        <b-collapse id="examples">
          <div v-b-toggle.forgeExample class="btn btn-link w-100 text-left pt-2 pb-1 px-3 text-light bg-primary mb-1">
            <h5 class="">ForgeUI Icon Example</h5>
          </div>
          
          <b-collapse id="forgeExample">
            <Demo :code="exampleCode2" :component="example2" />
          </b-collapse>
  
          <div v-b-toggle.bootstrapExample class="btn btn-link w-100 text-left pt-2 pb-1 px-3 text-light bg-secondary mb-4">
            <h5>Bootstrap Icon Example</h5>
          </div>

          <b-collapse id="bootstrapExample">
            <Demo :code="exampleCode" :component="example" />
          </b-collapse>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row align-v="start">
      <b-col cols="12" class="mb-4">
        <b-form @submit.prevent>
          <b-form-group
              label-for="bv-icons-table-search"
              label-cols-sm="auto"
              label-align-sm="right"
              :description="`Showing ${filteredIcons.length} of ${allIcons.length} icons`"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                  id="bv-icons-table-search"
                  key="_bv-icons-table-search_"
                  v-model="iconFilter"
                  type="search"
                  debounce="250"
                  autocomplete="off"
                  aria-controls="bv-icons-table-result"
                  placeholder="Search all Icons"></b-form-input>
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
          tag="ul"
          name="flip-icon-list"
          class="row flex-row justify-content-center row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 row-cols-xxl-10 list-unstyled"
      >
        <b-col
            v-for="icon in filteredIcons.filter(i => i.name.startsWith('forge'))"
            :key="`_icon_${icon.name}`"
            tag="li"
            class="flip-icon-list-icon d-inline-flex flex-column mb-4 text-center mb-5 icon-size hover:cursor-pointer"
            @mouseover="icon.isHovering = true"
            @mouseleave="icon.isHovering = false"
            
            :class="{isHovered : icon.isHovering}"
        >
          <b-card 
              bg-variant="light" 
              class="mx-auto border-0" 
              no-body
              @click="clickedIcon(icon)"
              :class="{iconHoverSize: icon.isHovering}">
            <b-icon :id="icon.name" :icon="icon.name"></b-icon>
          </b-card>
          <b-form-text class="mt-2 text-break" :title="icon.name">{{ icon.name }}</b-form-text>
          <b-button variant="link" @click="downloadSvg(icon)">Download</b-button>
        </b-col>
      </transition-group>
      <div v-if="filteredIcons.filter(i => !i.name.startsWith('forge')).length > 0 ">
        <div class="mb-5 mt-2">
          <h4 class="border-bottom pb-3">Bootstrap Icons:</h4>
        </div>
        <transition-group
            tag="ul"
            name="flip-icon-list"
            class="row flex-row justify-content-center row-cols-3 row-cols-sm-4 row-cols-lg-6 row-cols-xl-8 row-cols-xxl-10 list-unstyled"
        >
          <b-col
              v-for="icon in filteredIcons.filter(i => !i.name.startsWith('forge'))"
              :key="`_icon_${icon.name}`"
              tag="li"
              class="flip-icon-list-icon d-inline-flex flex-column mb-4 text-center mb-5 icon-size"
              @mouseover="icon.isHovering = true"
              @mouseleave="icon.isHovering = false"
              :class="{isHovered : icon.isHovering}"
          >
  
  
            <b-card 
                bg-variant="light" 
                class="mx-auto border-0" 
                no-body
                @click="clickedIcon(icon)"
                :class="{iconHoverSize: icon.isHovering}">
              <b-icon :id="icon.name" :icon="icon.name" ></b-icon>
            </b-card>
            <b-form-text class="mt-2 text-break" :title="icon.name">{{ icon.name }}</b-form-text>
            <b-button variant="link" @click="downloadSvg(icon)">Download</b-button>
          </b-col>
        </transition-group>
      </div>
      
      
      <div aria-live="polite" aria-atomic="true">
        <b-alert
            :show="filteredIcons.length === 0"
            :role="null"
            :aria-live="null"
            :aria-atomic="null"
            fade
            variant="light"
            class="text-center mt-4 d-flex align-items-center justify-content-center"
        >
          <b-icon icon="alert-triangle-fill" aria-hidden="true"></b-icon>
          <span>No matching icons found. Try searching again.</span>
        </b-alert>
      </div>
    </div>
    <p class="text-center">Use the search to search all {{allIcons.length}} icons, or view all at <a href="https://bootstrap-vue.org/docs/icons#icons" target="_blank">Bootstrap Icons</a></p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
//@ts-ignore
import { forgeIcons, bootstrapIcons } from "../../assets/iconNames";

import Demo from '../../components/Demo.vue';

import Example from "./examples/bootstrapExample.vue";
import ExampleCode from "./examples/bootstrapExample.vue?raw"

import Example2 from "./examples/forgeExample.vue";
import ExampleCode2 from "./examples/forgeExample.vue?raw"

import { ForgeIcon, ForgeIcons, ForgeToasts } from "@3squared/forge-ui";
import {BRow, BCol, BForm, BFormGroup, BInputGroup, BInputGroupPrepend, BFormInput, BIcon, BCard, BFormText, BAlert, BootstrapVueIcons, BCollapse, VBToggle, BButton} from 'bootstrap-vue';

Vue.use(BootstrapVueIcons);
Vue.use(ForgeIcons);
Vue.use(ForgeToasts);

export default Vue.extend({
  name: 'BVIconsTable',
  components: {BRow, BCol, BForm, BFormGroup, BInputGroup, BInputGroupPrepend, BFormInput, BIcon, BCard, BFormText, BAlert, BCollapse, Demo, BButton},
  directives: { 'b-toggle': VBToggle },
  data() {
    return {
      loadedIcons: [] as Array<ForgeIcon>,
      allIcons: [] as Array<ForgeIcon>,
      iconFilter: '',
    }
  },
  methods: {
    clickedIcon(icon : ForgeIcon) {
      let copy = '<b-icon-' + icon.name + ' variant=\'brand\' />';
      navigator.clipboard.writeText(copy);
      this.$forgeToast('success', `Copied ${icon.name}`);
    },
    downloadSvg(icon : ForgeIcon | BIcon) {
      const svg = document.getElementById(icon.name)!.outerHTML
      let a = document.createElement('a')
      a.href = window.URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      a.download = `${icon.name}.svg`
      a.click()
      a.remove()
    }
  },

  computed: {
    filteredIcons() : Array<ForgeIcon>{
      if (this.loadedIcons) {
        const terms = this.iconFilter
            .trim()
            .toLowerCase()
            .split(/\s+/)
        if (terms[0].length === 0) {
          return this.loadedIcons;
        }
        return this.allIcons.filter((icon : ForgeIcon) => terms.every((term : string) => icon.name.indexOf(term) !== -1))
      }
      return [];
    },
    exampleCode() {
      return ExampleCode;
    },
    example() {
      return Example;
    },
    exampleCode2() {
      return ExampleCode2;
    },
    example2() {
      return Example2;
    }
  },
  
  beforeMount() {
     this.loadedIcons = [...forgeIcons
        .sort()
        .map((forgeIcon : string) => {
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
        .map((bootstrapIcon : string) => {
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
        .map((bootstrapIcon : string)=> {
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