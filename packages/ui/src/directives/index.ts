import { DirectiveOptions } from 'vue';

export const positiveNumberDirective: DirectiveOptions = {
  bind(el) {
    el.addEventListener('keypress', event => {
      if (event.key === '-') {
        event.preventDefault();
      }
    });
  }
};

export const wholeNumberDirective: DirectiveOptions = {
  bind(el) {
    el.addEventListener('keypress', event => {
      if (event.key === '.') {
        event.preventDefault();
      }
    });
  }
};

export const alphanumericCharacterDirective: DirectiveOptions = {
  bind(el) {
    el.addEventListener('keypress', event => {
      if (!event.key.match(/^[a-zA-Z0-9]*$/)) {
        event.preventDefault();
      }
    })
  }
};

export const maxNumericCharactersDirective: DirectiveOptions = {
  bind(el, binding) {
    el.addEventListener('keypress', event => {
      const inputEl = <HTMLInputElement>event.target;
      if (inputEl.value && binding.value) {
        const val = parseFloat(inputEl.value);
        const maxLength = binding.value;
        const includeMinus = val < 0 ? 1 : 0;

        if (inputEl.value.length >= (maxLength + includeMinus)) {
          event.preventDefault();
        }
      }
    })
  }
};