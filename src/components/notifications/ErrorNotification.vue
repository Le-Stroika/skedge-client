<template>
    <base-notification
        position="top right"
        v-bind="$attrs"
        group="notification"
        type="error"
        icon-name="error"
        base-class="ErrorNotification"
        icon-class="ErrorNotification__icon"
        close-class="ErrorNotification__close"
        title-class="ErrorNotification__title"
        text-class="ErrorNotification__text"
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
    .ErrorNotification {
        background-color: color-link("ErrorNotification", "error_color", "background");

        & .ErrorNotification__icon, & .ErrorNotification__title {
            color: color-link("ErrorNotification", "error_color", "text");
        }

        & .ErrorNotification__text {
            color: color-link("ErrorNotification", "text_color", "secondary");
        }
    }
</style>