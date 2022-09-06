<template>
  <div>
    <div v-for="palette in colours" class="mb-5">
      <h1 class="pb-3">{{ palette.title }}</h1>
      <div class="d-flex color-swatch pb-5">
        <div v-for="colour in palette.colours">
          <div :id="`swatch-${colour}`" :class="colour"></div>
          <b-dropdown variant="link" text="Copy" class="h-50">
            <b-dropdown-item @click="getColour(colour)">Hex Code</b-dropdown-item>
            <b-dropdown-item @click="copyToClipboard(colour)">Boostrap Class</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BDropdown, BDropdownItem } from "bootstrap-vue";
import rgbHex from "rgb-hex";

const colours = [
  { title: 'Neutral Shades', colours: ['bg-grey-900', 'bg-grey-800', 'bg-grey-700', 'bg-grey-600', 'bg-grey-500', 'bg-grey-400', 'bg-grey-300', 'bg-grey-200', 'bg-grey-100'] },
  { title: 'System Colours', colours: ['bg-primary', 'bg-secondary', 'bg-success', 'bg-success-light', 'bg-info', 'bg-warning', 'bg-warning-light', 'bg-danger', 'bg-light', 'bg-dark'] }
]

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value)
}

const getColour = (colour: string) => {
  const swatch = document.getElementById(`swatch-${colour}`) as Element
  const swatchStyles = getComputedStyle(swatch)
  const hex = `#${rgbHex(swatchStyles.backgroundColor)}`
  copyToClipboard(hex)
}
</script>

<style lang="scss">
.color-swatch {
  height: 64px;

  div {
    margin-right: 15px;
    height: 64px;
    width: 64px;
  }
}
</style>