import { computed, ref } from 'vue';

function formatKey(key: String) {
  return key.replace(/[A-Z]/g, '-$&').toLowerCase();
}

function useStringifyProp(key: String, prop: String | Number | Boolean | Object) {
  if (typeof prop === 'string' || typeof prop === 'number') {
    return `${formatKey(key)}="${prop}"`;
  } else if (typeof prop === 'boolean') {
    if(prop === false) { return `:${formatKey(key)}="${prop}"` }
    else { return `${formatKey(key)}` }
  } else if (typeof prop === 'function') {
    return `:${formatKey(key)}="${key}Function"`;
  } else if (prop instanceof Array) {
    return `${formatKey(key)}="${key}Array"`;
  } else if (prop instanceof Object) {
    return `:${formatKey(key)}="${key}Object"`
  }
}

interface PropDef {
  required?: boolean;
  disabled?: () => boolean;
}

interface SelectPropDef extends PropDef {
  type: 'select';
  options: any[];
}

export type PropDefs = SelectPropDef | PropDef;


export function usePlayground<T extends Record<string, any>>(defaultProps: T, inConfig?: Partial<Record<keyof T, PropDefs>>, additionalReset?: () => void) {
  const options = ref<T>({ ...defaultProps });
  const config = ref(inConfig ?? {} as Partial<Record<keyof T, PropDefs>>);

  const propVals = computed(() => {
    return Object.entries(options.value)
      .filter(([key, value]) => (defaultProps[key] !== value || defaultProps[key] !== value && !value || config.value[key] && config.value[key].required))
      .map(([k, v]) => useStringifyProp(k, v as any));
  });

  const reset = () => {
    options.value = { ...defaultProps };
    if (additionalReset) {
      additionalReset();
    }
  };


  return { options, config, propVals, reset };
}