<template>
    <v-popover
        placement="bottom-start"
        boundaries-element="document.body"
        trigger="manual"
        :auto-hide="false"
        :open="open"
        container="#App"
    >
        <!-- Settings cog -->
        <icon-base
            :class="[cogClass, 'SettingsCog']"
            size="3rem"
            ref="cogRef"
            @click="onClick"
        >
            settings
        </icon-base>

        <!-- Dropdown menu -->
        <template slot="popover">
            TODO: implement the settings dropdown menu
        </template>
    </v-popover>
</template>

<script>
/* global Power1 */
import * as Utilities from "../../utilities";
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
    props: {
        cogClass: {
            type: String,
            default: null
        }
    },
    methods: {
        onClick(e) {
            const cogEl = this.$refs.cogRef.$el;

            // Toggle open state
            this.open = !this.open;

            // Rotation animation
            if (this.open) {
                TweenLite.to(cogEl, 0.4, { 
                    rotation: "-=180deg",
                    ease: Power1.easeInOut
                });
            } else {
                TweenLite.to(cogEl, 0.4, { 
                    rotation: "+=180deg",
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