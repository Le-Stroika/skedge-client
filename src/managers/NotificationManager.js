// ------------------------------------------
// --- The manager file for notifications ---
// ------------------------------------------

export function showNotification(_this, group, type, title, text, options = {}) {
    _this.$notify({
        ...options,
        group, 
        type,
        title, 
        text
    });
}

export function showErrorNotification(_this, text, options = {}) {
    showNotification(_this, "notification", "error", "Error: ", text, options);
}

export function showWarningNotification(_this, text, options = {}) {
    showNotification(_this, "notification", "warning", "Warning: ", text, options);
}

export function showSuccessNotification(_this, text, options = {}) {
    showNotification(_this, "notification", "success", "Success: ", text, options);
}

export function showInfoNotification(_this, text, options = {}) {
    showNotification(_this, "notification", "info", "Info: ", text, options);
}