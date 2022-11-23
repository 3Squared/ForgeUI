// custom resolver for forge and bootstrap, see https://github.com/antfu/unplugin-vue-components#importing-from-ui-libraries
exports.forgeResolver = function () {
    return {
        type: 'component',
        resolve: function (name) {
            if (name.includes('Forge')) {
                return { importName: name, path: '@3squared/forge-ui' };
            }
            if (/^B[A-Z]/.test(name)) {
                return { importName: name, path: 'bootstrap-vue' };
            }
        }
    };
};
