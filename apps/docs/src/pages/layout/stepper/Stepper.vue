﻿<template>
  <div>
    <forge-page-header title="Stepper" />
    <OPTIONS></OPTIONS>
    <playground :options="options" :config="config" :code="code" @reset="reset">
      <template #component>
        <component :is="ForgeStepper" v-bind="options" />
      </template>
    </playground>
    The ForgeStepperStep object takes the following format
    <code-block :code="ForgeStepperStep" />
  </div>
</template>

<script setup lang="ts">
import OPTIONS from "./OPTIONS.md";
import { ForgePageHeader, ForgeStepper } from "@3squared/forge-ui";
import { computed } from "vue";
import { Playground, usePlayground, CodeBlock } from "@3squared/forge-playground";
import { buttonVariants } from "../../../composables/playgroundOptions";

const { options, propVals, config, reset } = usePlayground(
  {
    steps: [
      { key: "A", text: "Step A" },
      { key: "B", text: "Step B" },
      { key: "C", text: "Step C" },
      { key: "D", text: "Step D" }
    ],
    currentStep: 0,
    showSteps: true,
    showBackButton: true,
    variant: "primary"
  },
  {
    steps: { required: true },
    variant: { type: "select", options: buttonVariants, required: true }
  }
);

const code = computed(() => `<forge-stepper ${propVals.value.join(" ")}/>`);

const ForgeStepperStep = `{ key: string, text: string, noBack: boolean }`;
</script>
