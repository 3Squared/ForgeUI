﻿<template>
  <forge-multi-select :options="options" label="shortName" :multiple="false" placeholder="Search for a component" @select="pushSelectedRoute">
    <template #noResult>No Results Found.</template>
  </forge-multi-select>
</template>

<script setup lang="ts">
import routes from "pages-generated";
/* search bar setup */
import { computed, getCurrentInstance } from "vue";
import { RouteConfig } from "vue-router";
import { ForgeMultiSelect } from "@3squared/forge-ui";

interface Route {
  shortName: string | undefined;
  routeName: string | undefined;
}

const router = getCurrentInstance()!.proxy.$router;

const options = computed(() => {
  return routes
    .filter((route: RouteConfig) => route.name != null)
    .map((route: RouteConfig) => {
      return {
        shortName: route.name!.includes("-") ? fixRouteName(route.name!) : route.name,
        routeName: route.name
      };
    })
    .filter(
      (route: Route) =>
        route.shortName!.indexOf("index") &&
        route.shortName!.indexOf("api Mock") &&
        route.shortName!.indexOf("data") &&
        route.shortName!.indexOf("Component Example") &&
        route.shortName!.indexOf("R E A D M E") &&
        route.shortName!.indexOf("O P T I O N S") &&
        route.shortName!.indexOf("After V5") &&
        route.shortName!.indexOf("Before V5")
    );
});

function fixRouteName(routeName: string) {
  let temp = routeName.split("-");
  return temp[temp.length - 1].replace(/([A-Z])/g, " $1").trim();
}

function pushSelectedRoute(selected: Route) {
  router.push({ name: selected.routeName });
}
</script>
