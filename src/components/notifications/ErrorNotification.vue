<template>
    <!-- <notifications 
        group="error"
        position="top right"
    /> -->

    <base-notification
        group="error"
        position="top right"
        v-bind="$attrs"
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

<style lang="scss" scoped>

</style>