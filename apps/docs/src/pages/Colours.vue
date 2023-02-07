<template>
  <div>
    <div v-for="palette in palettes">
      <h1 class="mb-4 pb-1">{{ palette.title }}</h1>
      <template v-for="colours in palette.colours">
        <div class="d-flex mb-4 pb-1">
          <div v-for="shade in colours.shades" class="color-swatch d-flex flex-column h-100 pr-5">
            <p class="text-center mb-1">{{ shade.label }}</p>
            <div :id="`swatch-${shade.background}`" :class="shade.background"></div>
            <b-dropdown text="Copy" variant="link" class="h-50" toggle-class="pt-1 p-0">
              <b-dropdown-item @click="getColour(shade.background)">Hex Code</b-dropdown-item>
              <b-dropdown-item @click="copyToClipboard(shade.background)">Background Class</b-dropdown-item>
              <b-dropdown-item @click="copyToClipboard(shade.text)">Text Class</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BDropdown, BDropdownItem } from "bootstrap-vue";
import rgbHex from "rgb-hex";

const palettes = [
  {
    title: "Neutral Shades",
    colours: [
      {
        shades: [
          { background: "bg-grey-900", text: "text-grey-900", label: "Grey 900" },
          { background: "bg-grey-800", text: "text-grey-800", label: "Grey 800" },
          { background: "bg-grey-700", text: "text-grey-700", label: "Grey 700" },
          { background: "bg-grey-600", text: "text-grey-600", label: "Grey 600" },
          { background: "bg-grey-500", text: "text-grey-500", label: "Grey 500" },
          { background: "bg-grey-400", text: "text-grey-400", label: "Grey 400" },
          { background: "bg-grey-300", text: "text-grey-300", label: "Grey 300" },
          { background: "bg-grey-200", text: "text-grey-200", label: "Grey 200" },
          { background: "bg-grey-100", text: "text-grey-100", label: "Grey 100" }
        ]
      }
    ]
  },
  {
    title: "System Colours",
    colours: [
      {
        shades: [
          { background: "bg-primary", text: "text-primary", label: "Primary" },
          { background: "bg-secondary", text: "text-secondary", label: "Secondary" },
          { background: "bg-info", text: "text-info", label: "Info" },
          { background: "bg-success", text: "text-success", label: "Success" },
          { background: "bg-warning", text: "text-warning", label: "Warning" },
          { background: "bg-danger", text: "text-danger", label: "Danger" },
          { background: "bg-light", text: "text-light", label: "Light" },
          { background: "bg-dark", text: "text-dark", label: "Dark" }
        ]
      }
    ]
  }
];

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
};

const getColour = (colour: string) => {
  const swatch = document.getElementById(`swatch-${colour}`) as Element;
  const swatchStyles = getComputedStyle(swatch);
  const hex = `#${rgbHex(swatchStyles.backgroundColor)}`;
  copyToClipboard(hex);
};
</script>

<style lang="scss">
.color-swatch {
  div {
    height: 74px;
    width: 74px;
  }
}
</style>
