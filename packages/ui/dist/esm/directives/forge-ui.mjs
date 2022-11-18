const c = {
  bind(t) {
    t.addEventListener("keypress", (e) => {
      e.key === "-" && e.preventDefault();
    });
  }
}, l = {
  bind(t) {
    t.addEventListener("keypress", (e) => {
      e.key === "." && e.preventDefault();
    });
  }
}, u = {
  bind(t) {
    t.addEventListener("keypress", (e) => {
      e.key.match(/^[a-zA-Z0-9]*$/) || e.preventDefault();
    });
  }
}, v = {
  bind(t, e) {
    t.addEventListener("keypress", (r) => {
      const a = r.target;
      if (a.value && e.value) {
        const i = parseFloat(a.value), n = e.value, s = i < 0 ? 1 : 0;
        a.value.length >= n + s && r.preventDefault();
      }
    });
  }
};
export {
  u as alphanumericCharacterDirective,
  v as maxNumericCharactersDirective,
  c as positiveNumberDirective,
  l as wholeNumberDirective
};
