import { BvMsgBoxOptions } from 'bootstrap-vue';

export class ForgeModalBuilder {
  private options: BvMsgBoxOptions = {
    centered: true
  };

  constructor(id: string, title: string, onConfirm: () => any) {
    this.options.id = id;
    this.options.title = title;
    this.options.onConfirm = onConfirm;
  }

  setLegacyMode() {
    this.options.static = true;
    return this;
  }

  setOkOnly(okTitle?: string, okVariant?: string) {
    this.options.okOnly = true;
    this.options.okTitle = okTitle;
    this.options.okVariant = okVariant;
    return this;
  }

  setSize(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    this.options.size = size;
    return this;
  }

  setExtraProps(options: any) {
    this.options = { ...this.options, ...options };
    return this;
  }

  build() {
    return this.options;
  }
}
