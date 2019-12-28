<template>
    <base-notification
        position="top right"
        v-bind="$attrs"
        group="notification"
        type="warning"
        icon-name="warning"
        base-class="WarningNotification"
        icon-class="WarningNotification__icon"
        close-class="WarningNotification__close"
        title-class="WarningNotification__title"
        text-class="ErorrNotification__text"
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
    .WarningNotification {
        background-color: color-link("WarningNotification", "warning_color", "background");

        & .WarningNotification__icon, & .WarningNotification__title {
            color: color-link("WarningNotification", "warning_color", "text");
        }

        & .WarningNotification__text {
            color: color-link("WarningNotification", "text_color", "secondary");
        }
    }
</style>