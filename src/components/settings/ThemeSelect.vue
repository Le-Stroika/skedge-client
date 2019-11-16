<template>
    <select-field
        :options="themesList"
        :value="currTheme"
        @input="onThemeChange"
    ></select-field>
</template>

<script>
import SelectField from "@/components/ui/forms/SelectField.vue";

import { DEFAULT_NAMESPACE } from "../../constants/generalConstants";

import { mapState, mapActions } from "vuex";
import { actionTypes } from "../../store/types";

export default {
    components: {
        selectField: SelectField
    },
    computed: {
        ...mapState({
            currTheme: (state) => state.theme.namespaces[DEFAULT_NAMESPACE],
            themes: (state) => state.theme.themes
        }),
        themesList() {
            return Object.values(this.themes).map(themeData => themeData.name);
        }
    },
    methods: {
        ...mapActions({
            editNamespace: actionTypes.EDIT_NAMESPACE
        }),
        setTheme(theme) {
            this.editNamespace({ name: DEFAULT_NAMESPACE, targetTheme: theme });
        },
        onThemeChange(theme) {
            console.log("change theme to", theme);
            this.setTheme(theme);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>