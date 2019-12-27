import NotificationRegister from "@/registers/NotificationRegister.vue";

import { NotificationManager } from "../src/managers";

export default {
    title: "Notifications"
};

export const base = () => ({
    components: {
        NotificationRegister
    },
    template: `
        <div>
            <!-- Register the notification toasts here since the source 
            component is not available to us in storybook -->
            <notification-register></notification-register>

            <button
                @click="showError"
            >
                Error Notification
            </button>
        </div>
    `,
    methods: {
        showError() {
            NotificationManager.showNotification(
                this, 
                "error", 
                "hi", 
                "some error", 
                { 
                    type: "error",
                    duration: 1000000 // 1000 sec
                }
            );
        }
    }
});