<template>
    <base-notification
        position="top right"
        v-bind="$attrs"
        group="notification"
        type="success"
        icon-name="check"
        base-class="SuccessNotification"
        icon-class="SuccessNotification__icon"
        close-class="SuccessNotification__close"
        title-class="SuccessNotification__title"
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
    .SuccessNotification {
        background-color: color-link("SuccessNotification", "success_color", "background");

        & .SuccessNotification__icon, & .SuccessNotification__title {
            color: color-link("SuccessNotification", "success_color", "text");
        }

        & .SuccessNotification__text {
            color: color-link("SuccessNotification", "text_color", "secondary");
        }
    }
</style>