<template>
    <base-notification
        position="top right"
        v-bind="$attrs"
        group="notification"
        type="info"
        icon-name="info"
        base-class="InfoNotification"
        icon-class="InfoNotification__icon"
        close-class="InfoNotification__close"
        title-class="InfoNotification__title"
        text-class="InfoNotification__text"
    >
    </base-notification>
</template>

<script>
import BaseNotification from "@/components/notifications/BaseNotification.vue";

export default {
    components: {
        BaseNotification
    }
}
</script>

<style lang="scss">
    .InfoNotification {
        background-color: color-link("InfoNotification", "info_color", "background");

        & .InfoNotification__icon, & .InfoNotification__title {
            color: color-link("InfoNotification", "info_color", "text");
        }

        & .InfoNotification__text {
            color: color-link("InfoNotification", "text_color", "secondary");
        }
    }
</style>