<template>
    <div class="NotificationRegister">
        <notifications 
            position="top right"
            group="notification"
            v-bind="$attrs"
        >
            <!-- This toggle system is unfortunately needed due to how Vue-Notifications works -->
            <template slot="body" slot-scope="props">
                <error-notification v-if="props.item.type == 'error'" :props="props" v-bind="$attrs" />
                <warning-notification v-else-if="props.item.type == 'warning'" :props="props" v-bind="$attrs" />
                <success-notification v-else-if="props.item.type == 'success'" :props="props" v-bind="$attrs" />
                <info-notification v-else :props="props" v-bind="$attrs" />
            </template>
        </notifications>
    </div>
</template>

<script>
import ErrorNotification from "@/components/notifications/ErrorNotification.vue";
import WarningNotification from "@/components/notifications/WarningNotification.vue";
import SuccessNotification from "@/components/notifications/SuccessNotification.vue";
import InfoNotification from "@/components/notifications/InfoNotification.vue";

export default {
    components: {
        ErrorNotification,
        WarningNotification,
        SuccessNotification,
        InfoNotification
    }
}
</script>