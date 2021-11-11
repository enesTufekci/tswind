function create() {}

interface Wind {
  extend: () => void;
}

const wind = new Proxy(Object.create({}), {
  get: function (_, prop, __) {
    if (prop === "") {
      return "world";
    }
    return create;
  },
});
