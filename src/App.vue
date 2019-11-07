<template>
    <!-- <div id="app"> -->
    <theme-provider id="app" ref="baseRef" :namespace="defaultNamespace" use-root>
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/summer">Summer Scheduler</router-link>|
            <router-link to="/fall-winter">Fall/Winter Scheduler</router-link>
        </div>
        <router-view />
    </theme-provider>
    <!-- </div> -->
    
</template>

<script>
import { getterTypes, actionTypes } from "./store/types";
import { mapActions, mapGetters } from "vuex";

// Themes
import DarkTheme from "./theme/themes/dark";

import ThemeProvider from "@/components/wrappers/ThemeProvider.vue";

const DEFAULT_NAMESPACE = "default";

export default {
    components: {
        themeProvider: ThemeProvider
    },
    data() {
        return {
            defaultNamespace: DEFAULT_NAMESPACE
        }
    },
    created() {
        // Instantiate Vuex data
        this.instantiateThemes();
        this.instantiateNamespaces();
    },
    methods: {
        ...mapActions({
            addTheme: actionTypes.ADD_THEME,
            addNamespace: actionTypes.ADD_NAMESPACE,
        }),
        instantiateThemes() {
            // Add dark theme
            this.addTheme({
                name: DarkTheme.name,
                theme: DarkTheme.theme,
                override: true
            });
        },
        instantiateNamespaces() {
            // Add default namespace
            this.addNamespace({
                name: DEFAULT_NAMESPACE,
                targetTheme: "dark", // TODO: don't hardcode
                override: true
            })
        }
    }
}
</script>

<style lang="scss">
    @import "~themer/tools/sass/index.scss";

    #app {
        background-color: color-link("global", "background_color", "primary");
    }
</style>
