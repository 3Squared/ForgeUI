<template>
  <b-modal ref="modal" class="position-relative" @ok="success" v-bind="mergedAttrs" v-on="$listeners"
           @hidden="reset($event); preventBackgroundScroll(false)" @show="preventBackgroundScroll(true)"
  >
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <div :key="slot" class="w-100">
        <template v-if="slot === 'default'">
          <b-alert v-model="error.hasError" variant="danger">
            <p>{{ error.header }}</p>
            <ul>
              <li v-for="detail in error.message" :key="detail">
                {{ detail }}
              </li>
            </ul>
          </b-alert>
        </template>
        <slot :name="slot" v-bind="scope" />
        <template v-if="slot === 'default'">
          <slot name="loader" v-if="loading">
            <forge-loader></forge-loader>
          </slot>
        </template>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BModal, BAlert, BvModalEvent } from 'bootstrap-vue';
import ForgeLoader from '../loader/Loader.vue';
import { parseError } from '../../../helpers/index';
import cloneDeep from 'lodash/cloneDeep';

interface ModalError {
  hasError: boolean,
  header: string,
  message: string[]
}

/**
 * @displayName Modal
 **/
export const ForgeModal = /*#__PURE__*/ defineComponent({
  name: 'ForgeModal',
  components: { BModal, BAlert, ForgeLoader },
  inheritAttrs: false,
  props: {
    onConfirm: {
      type: Function,
      default: null
    },
    legacy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      error: {} as ModalError,
      emptyError: {
        hasError: false,
        header: '',
        message: []
      }
    };
  },
  created() {
    this.error = cloneDeep(this.emptyError);
  },
  methods: {
    async success(event : BvModalEvent) {
      if (this.onConfirm) {
        event.preventDefault();

        this.loading = true;

        this.error.hasError = false;
        try {
          const result = await this.onConfirm();
          if (result || result == undefined) {
            (this.$refs.modal! as BModal).hide();
          }
        } catch (e) {
          this.error.hasError = true;
          const result = parseError(e);
          this.error.header = result.errorMessage;
          this.error.message = result.errorDetails;
        }
        this.loading = false;
      }
    },
    async reset(event : Event) {
      this.error = this.error = cloneDeep(this.emptyError);
      this.loading = false;
      this.$emit('hidden', event);
    },
    preventBackgroundScroll(open : boolean) {
      if (this.legacy) {
        if (open) {
          document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
      }
    },
  },
  computed: {
    mergedAttrs() : Object{
      return {
        centered: true,
        cancelVariant: 'outline-secondary modal-cancel',
        hideHeaderClose: true,
        ...this.$attrs
      };
    }
  },
});

export default ForgeModal;
</script>
