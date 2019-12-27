import { ModalManager } from "../src/managers";

import ModalBase from "@/components/modals/ModalBase.vue";

export default {
    title: "Modal Tests"
};

export const base = () => ({
    components: {
        ModalBase
    },
    template: `
        <div>
            <button @click="showModal">Show Modal</button>
        </div>
    `,
    methods: {
        showModal() {
            ModalManager.showModal(this, "_BASE_");
        }
    }
});