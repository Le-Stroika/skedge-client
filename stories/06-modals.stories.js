import { ModalManager } from "../src/managers";

export default {
    title: "Modals"
};

export const base = () => ({
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