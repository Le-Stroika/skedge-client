<template>
    <v-popover
        placement="bottom-start"
        boundaries-element="document.body"
        trigger="manual"
        :auto-hide="false"
        :open="open"
        container="#App"
        offset="2"
        popover-base-class="SettingsTooltipBase SettingsPopoverBase"
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
            <tooltip-base
                :class="[tooltipClass, 'SettingsTooltip']"
            >
                TODO: implement the settings menu
                <br>
                Some stuff here
                <br>
                Blah blah
            </tooltip-base>
        </template>
    </v-popover>
</template>

<script>
/* global Power1 */
import * as Utilities from "../../utilities";
import { TweenLite } from "gsap/all";

import IconBase from "@/components/ui/icons/IconBase.vue";
import TooltipBase from "@/components/ui/tooltip/TooltipBase.vue";

export default {
    components: {
        iconBase: IconBase,
        tooltipBase: TooltipBase
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
        },
        tooltipClass: {
            type: String,
            default: null
        }
    },
    methods: {
        onClick(e) {
            const duration = 0.3;

            const cogEl = this.$refs.cogRef.$el;

            // Toggle open state
            this.open = !this.open;

            // Rotation animation
            if (this.open) {
                TweenLite.to(cogEl, duration, { 
                    rotation: "-=180deg",
                    ease: Power1.easeInOut
                });
            } else {
                TweenLite.to(cogEl, duration, { 
                    rotation: "+=180deg",
                    ease: Power1.easeInOut
                });
            }
        }
    }
}
</script>

<style lang="scss">
// Note: can not be scoped b/c of the popover stylings

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

        z-index: 3;
    }
    
    .SettingsTooltip {
        margin-right: 0.3rem;
    }

    // Transition override
    .SettingsTooltipBase.SettingsPopoverBase {
        $duration: 0.3s;

        z-index: 2;

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity $duration, visibility $duration;

            & .wrapper {
                transform: translateY(-10px);
                transition: transform $duration;
            }
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
            transition: opacity $duration, transform $duration;

            & .wrapper {
                transform: translateY(0px);
                transition: transform $duration;
            }
        }
    }
</style>