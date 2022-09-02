<template>
  <div>
    <div class="page" />
    <div class="background" />
    <b-row class="mt-3 mb-4">
      <b-col cols="12 ">
        <h2 class="font-weight-bold text-secondary my-3 display-4">Welcome to ForgeUI Style Guide <img
            src="https://cdn.dev.3sq.app/assets/products/general/images/forge-favicon.ico" style="width: 48px; position: relative; top: -2px" alt="" /></h2>
      </b-col>
      <hr class="bg-secondary" />
    </b-row>
    <b-row>
      <b-col cols="12" md="12" lg="6" offset-lg="0" class=" text-brand pt-3 h-50 ">
        <p class="text-center lead description text-muted mt-0 fade-border px-5 mb-4">
          <span style="font-weight:bold" class="text-brand-shade-3 px-2">ForgeUI</span> is designed to be a wrapper around different libraries that provide a consistent UI style.
          It is comprised of many different packages that have been combined to create a one stop shop for UI requirements.
        </p>
        <b-row>
          <b-col cols="12 mt-2" class="text-center">
            <home-icons />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="4" class="pl-4 mt-5 comp-search" offset-md="0">
        <RouteSearcher />
        <b-row>
          <b-col class="mt-3 text-center" cols="12">
            <div>
              <b-col cols="12" class="pb-2">
                <b-button class="m-2 btn text-light" variant="primary" :to="{path:'/Getting-Started/installation'}">Get Started</b-button>
                <forge-action-button v-if="!isEnvPwa" variant="outline-success" class="btn-inline-block d-md-none installBtn" :action="download">Download Style-Guide</forge-action-button>
                <forge-action-button v-if="!isEnvPwa" variant="outline-success" class="mx-auto d-none d-md-inline-block btn-brand installBtn my-2" :action="download">Download Style-Guide
                </forge-action-button>
              </b-col>
              <p class="font-italic mt-2">You can now use the <span class="text-brand font-weight-bold">style-guide</span> offline!</p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script setup lang="ts">
import HomeIcons from '../assets/HomeIcons.md'
import RouteSearcher from '../components/RouteSearcher.vue'
import { BRow, BCol, BButton } from "bootstrap-vue";
import { ForgeActionButton, ForgeToasts } from '@3squared/forge-ui';
import Vue, { getCurrentInstance } from "vue";
import { ref, onMounted } from "vue";

Vue.use(ForgeToasts)

const proxy = getCurrentInstance()!.proxy!

// Check to see if they're using pwa
const displayMode = 'browser';
const standAlone = '(display-mode: standalone)';

//@ts-ignore
const isEnvPwa = ref(!!(navigator.standalone || window.matchMedia(standAlone).matches))

console.log(`You are viewing this on ${displayMode}`)

//@ts-ignore
let deferredPrompt;
onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
  });
});

async function download() {
  // In-case they instantly hit the download button when loading the page for first time
  // it will think they already have it downloaded when in reality it just hasn't had time to load.
  await new Promise(res => setTimeout(res, 2000));
  try {
    //@ts-ignore
    deferredPrompt.prompt();
    //@ts-ignore
    const outcome = deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
      isEnvPwa.value = true;
    }
  } catch (e) {
    proxy.$forgeToast('error', 'There was an error downloading... Maybe you already have it downloaded?');
  }

}
</script>
<style scoped>
.description {
  font-size: 1.4rem;
  line-height: 1.4;
}

.page {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(250, 245, 243, 0.25);
}

.fade-border {
  border-right: 2px solid #eee;
}


.searchbar {
  height: 40px;
}

.searchbtn {
  cursor: pointer;
}
</style>