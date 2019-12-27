// -------------------------------------------------
// --- The manager file for all modal components ---
// -------------------------------------------------

import * as LoaderManager from "./LoaderManager";

// TODO: modal registration should be moved out to a different file
export const REGISTERED_MODALS = {
    "_BASE_": "@/components/modals/ModalBase.vue"
};

const DEFAULT_PROPS = {};
const DEFAULT_PARAMS = {
    height: "75%",
    width: "600px",
    draggable: true,
    adaptive: true,
    clickToClose: true,
};
const DEFAULT_EVENTS = {};

export async function showModal(_this, modalName, props = {}, params = {}, events = {}) {
    const modalPath = REGISTERED_MODALS[modalName];

    if (!modalPath) {
        throw `Modal '${modalName}' not found.`;
    }

    const ComponentLoader = LoaderManager.prepare(modalPath);
    const Component = await ComponentLoader.load();

    // Args: component/name, props, params, events
    _this.$modal.show(
        Component, 
        { ...DEFAULT_PROPS, ...props }, 
        { ...DEFAULT_PARAMS, ...params }, 
        { ...DEFAULT_EVENTS, ...events }
    );
}