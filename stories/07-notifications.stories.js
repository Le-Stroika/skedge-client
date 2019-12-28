import NotificationRegister from "@/registers/NotificationRegister.vue";

import { NotificationManager } from "../src/managers";

export default {
    title: "Notifications"
};

const DURATION = 5000; // 5 sec

export const base = () => ({
    components: {
        NotificationRegister
    },
    template: `
        <div>
            <!-- Register the notification toasts here since the source 
            component is not available to us in storybook -->
            <notification-register></notification-register>

            <button @click="showError">
                Error Notification
            </button>

            <button @click="showWarning">
                Warning Notification
            </button>

            <button @click="showSuccess">
                Success Notification
            </button>

            <button @click="showInfo">
                Info Notification
            </button>
        </div>
    `,
    methods: {
        showError() {
            NotificationManager.showErrorNotification(this, "Some error message", { duration: DURATION });
        },
        showWarning() {
            NotificationManager.showWarningNotification(this, "Some warning message", { duration: DURATION });
        },
        showSuccess() {
            NotificationManager.showSuccessNotification(this, "Some success message", { duration: DURATION });
        },
        showInfo() {
            NotificationManager.showInfoNotification(this, "Some info message", { duration: DURATION });
        }
    }
});