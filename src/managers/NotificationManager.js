// ------------------------------------------
// --- The manager file for notifications ---
// ------------------------------------------

export function showNotification(_this, group, title, text, options = {}) {
    _this.$notify({
        ...options,
        group, 
        title, 
        text
    });
}