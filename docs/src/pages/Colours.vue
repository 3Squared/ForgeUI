<template>
  <div class="position-absolute w-100 colours">
    <h1>Colours</h1>
    <div class="pl-5">
      <h3 class="mt-4">- Brand Colours:</h3>
      <div class="color-swatch">
        <div class="bg-brand-shade-1"></div>
        <div class="bg-brand-shade-2"></div>
        <div class="bg-brand-shade-3"></div>
        <div class="bg-brand"></div>
        <div class="bg-brand-dark"></div>
      </div>
  
      <h3 class="mt-4">- Greys:</h3>
      
      <div class="color-swatch">
        <div class="bg-grey-100"></div>
        <div class="bg-grey-200"></div>
        <div class="bg-grey-300"></div>
        <div class="bg-grey-400"></div>
        <div class="bg-grey-500"></div>
        <div class="bg-grey-600"></div>
        <div class="bg-grey-700"></div>
        <div class="bg-grey-800"></div>
        <div class="bg-grey-900"></div>
        <div class="bg-grey-1000"></div>
      </div>
  
      <h3 class="mt-4">- Primary Colours:</h3>
      <div class="color-swatch">
        <div class="bg-primary-light"></div>
        <div class="bg-primary"></div>
        <div class="bg-primary-dark"></div>
      </div>
      
      <h3 class="mt-4">- Success Colours:</h3>
      <div class="color-swatch">
        <div class="bg-success-light"></div>
        <div class="bg-success"></div>
        <div class="bg-success-dark"></div>
      </div>
  
      <h3 class="mt-4">- Warning Colours:</h3>
      <div class="color-swatch">
        <div class="bg-warning-light"></div>
        <div class="bg-warning"></div>
        <div class="bg-warning-dark"></div>
      </div>
  
      <h3 class="mt-4">- Danger Colours:</h3>
      <div class="color-swatch">
        <div class="bg-danger-light"></div>
        <div class="bg-danger"></div>
        <div class="bg-danger-dark"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const d = ref('a')
</script>

<style lang="scss">
.color-swatch {
  display: flex;
  height: 50px;
  padding-left: 15px;;

  div {
    height: 50px;
    width: 50px;
  }
}

.colours {
  left: 50px;
}
</style>