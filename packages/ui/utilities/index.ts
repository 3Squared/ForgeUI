// custom resolver for forge and bootstrap, see https://github.com/antfu/unplugin-vue-components#importing-from-ui-libraries
exports.forgeResolver = () => {
  return {
    type: "component",
    resolve: (name: any) => {
      if (name.includes("Forge")) {
        return { importName: name, path: "@3squared/forge-ui" };
      }
      if (/^B[A-Z]/.test(name)) {
        return { importName: name, path: "bootstrap-vue" };
      }
    }
  };
};
