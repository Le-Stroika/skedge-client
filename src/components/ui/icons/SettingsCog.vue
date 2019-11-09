<template>
    <v-popover
        placement="bottom-start"
        boundaries-element="document.body"
        trigger="manual"
        :auto-hide="false"
        :open="open"
    >
        <icon-base
            class="SettingsCog"
            size="3rem"
            ref="cogRef"
            @click="onClick"
        >
            <!-- TODO: remove -->
            <!-- v-tooltip.bottom-start="{ 
                trigger: 'click', 
                content: 'Some shit dwhfoe nawodiha woi ', 
                boundariesElement: 'document.body'
            }" -->
            settings
        </icon-base>

        <template slot="popover">
            TODO: implement the settings dropdown menu
        </template>
    </v-popover>
</template>

<script>
/* global Power1 */
import * as Utilities from "../../../utilities";
import { TweenLite } from "gsap/all";

import IconBase from "@/components/ui/icons/IconBase.vue";

export default {
    components: {
        iconBase: IconBase
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {
        onClick(e) {
            console.log("Clicked");

            const cogEl = this.$refs.cogRef.$el;

            this.open = !this.open;

            console.log("open:", this.open);

            if (this.open) {
                TweenLite.to(cogEl, 0.4, { 
                    rotation: "+=90deg",
                    ease: Power1.easeInOut
                });
            } else {
                TweenLite.to(cogEl, 0.4, { 
                    rotation: "-=90deg",
                    ease: Power1.easeInOut
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .SettingsCog {
        display: inline-block;

        color: color-link("SettingsCog", "text_color", "primary");
        cursor: pointer;

        & i {
            transition: color 0.2s;
        }

        &:hover {
            color: color-link("SettingsCog", "text_color", "secondary");
        }
    }
</style>