import Vue, { CreateElement, getCurrentInstance, VNode, VueConstructor } from 'vue';
import { BAlert, BModal, ModalPlugin } from 'bootstrap-vue';
import { ForgeModalConfig } from '../../../helpers/types';

function getBody(h: CreateElement, body: ForgeModalConfig['body'], bAlertVariant?: string): VNode {
    const resolvedBody = body.map(b => (typeof b === 'function' ? b(h) : b));

    const inner = h('div', {slot: 'default'}, resolvedBody);

    return bAlertVariant
        ? h(
            BAlert,
            {
                props: {
                    variant: bAlertVariant,
                    show: true
                },

                class: `font-weight-bold border-${bAlertVariant}`
            },
            [inner]
        )
        : inner;
}

function mountModal(vue: Vue, okOnly: boolean, {
    body,
    options,
    bAlertVariant,
    modalId,
    appendTo
}: ForgeModalConfig): { component: Vue; modal: BModal } {
    const ref = 'modalInstance';

    const attrs = {
        static: true,
        lazy: true,
        okOnly,
        ...options,
        id: modalId
    };

    const component = new Vue({
        render: (h: CreateElement) => h(BModal, {attrs, ref}, [getBody(h, body, bAlertVariant)])
    });

    const containerEl = appendTo ? document.querySelector(appendTo) : vue.$el;

    if (!containerEl) {
        throw new Error('appendTo element was not found');
    }

    const hostEl = document.createElement('div');
    containerEl.appendChild(hostEl);
    component.$mount(hostEl);

    return {component, modal: component.$refs[ref] as BModal};
}

class ForgeModalHelper {
    constructor(private readonly vm: Vue) {
    }

    ok(config: ForgeModalConfig) {
        return new Promise<true>(resolve => {
            const {component, modal} = mountModal(this.vm, true, config);

            modal.$once('hide', () => resolve(true));
            modal.$once('hidden', () => component.$destroy());
            modal.show();
        });
    }

    confirm(config: ForgeModalConfig) {
        return new Promise<boolean | null>(resolve => {
            const {component, modal} = mountModal(this.vm, false, config);

            modal.$once('hide', ({trigger}: { trigger: string }) => resolve(trigger === 'ok' ? true : trigger === 'cancel' ? false : null));
            modal.$once('hidden', () => component.$destroy());
            modal.show();
        });
    }
}

const PROP_NAME = '$forgeModal';
const PROP_NAME_PRIV = '_forgeModalHelper';

export default {
    install(Vue: VueConstructor) {
        Vue.use(ModalPlugin)
        // Provide new instance of helper with current Vue instance
        Vue.mixin({
            beforeCreate() {
                Object.defineProperty(this, PROP_NAME_PRIV, {
                    value: new ForgeModalHelper(this),
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
            }
        });

        // Define instance method to access private helper instance
        Object.defineProperty(Vue.prototype, PROP_NAME, {
            get() {
                return this[PROP_NAME_PRIV];
            }
        });
    }
};

export function useForgeModal() {
    const inst = getCurrentInstance()?.proxy;

    function forgeOkModal(config: ForgeModalConfig) {
        if (inst) {
            return inst.$forgeModal.ok(config);
        }
        console.warn('method can only be used inside setup() or functional components')
        return;
    }

    function forgeConfirmModal(config: ForgeModalConfig) {
        if (inst) {
            return inst.$forgeModal.confirm(config);
        }
        console.warn('method can only be used inside setup() or functional components')
        return;
    }

    return {forgeOkModal, forgeConfirmModal}
}
