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
        open-group="settings"
    >
        <!-- Settings cog -->
        <icon-clickable
            :class="['SettingsCog', cogClass]"
            :style="[cogStyle]"
            size="3rem"
            ref="cogRef"
            @click="toggleMenu"
        >
            settings
        </icon-clickable>

        <!-- Tooltip menu -->
        <template slot="popover">
            <tooltip-base
                :class="['SettingsTooltip', tooltipClass]"
                :style="[tooltipStyle]"
                container-class="SettingsTooltip__container"
            >
                <div class="SettingsTooltip__header">
                    <div class="SettingsTooltip__header-text">
                        General Settings
                    </div>
                    <icon-clickable 
                        class="SettingsTooltip__header-close"
                        @click="closeMenu"
                        size="2.3rem"
                    >
                        close
                    </icon-clickable>
                </div>

                <div class="SettingsTooltip__theme-select">
                    TODO: implement theme selection
                </div>

                <div class="SettingsTooltip__campus-select">
                    TODO: implement campus search selection
                </div>

            </tooltip-base>
        </template>
    </v-popover>
</template>

<script>
/* global Power1 */
import * as Utilities from "../../utilities";
import { TweenLite } from "gsap/all";

import IconClickable from "@/components/ui/icons/IconClickable.vue";
import TooltipBase from "@/components/ui/tooltip/TooltipBase.vue";

const ANIM_DURATION = 0.3;

export default {
    components: {
        iconClickable: IconClickable,
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
        cogStyle: {
            type: Object,
            default: null
        },
        tooltipClass: {
            type: String,
            default: null
        },
        tooltipStyle: {
            type: Object,
            default: null
        }
    },
    methods: {
        openMenu() {
            this.setOpen(true);
        },
        closeMenu() {
            this.setOpen(false);
        },
        toggleMenu() {
            this.setOpen(!this.open);
        },
        setOpen(open) {
            const cogEl = this.$refs.cogRef.$el;

            // Set open state
            this.open = open;

            // Rotation animation
            if (this.open) {
                TweenLite.to(cogEl, ANIM_DURATION, { 
                    rotation: "-=180deg",
                    ease: Power1.easeInOut
                });
            } else {
                TweenLite.to(cogEl, ANIM_DURATION, { 
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
        z-index: 3;
    }
    
    .SettingsTooltip {
        // This accomplishes the "margin" effect without blowing up v-tooltip
        padding: 0.3rem 0.5rem 0.3rem 0.5rem;

        max-width: 40rem;
        width: 100vw;

        & .SettingsTooltip__container {
            display: flex;
            flex-direction: column;

            & .SettingsTooltip__header {
                display: flex;
                align-items: center;
                justify-content: space-between;

                & .SettingsTooltip__header-text {
                    font-weight: 500;
                }

                & .SettingsTooltip__header-close {

                }
            }

            & .SettingsTooltip__theme-select {
                color: color-link("global", "text_color", "secondary");
            }

            & .SettingsTooltip__campus-select {
                color: color-link("global", "text_color", "secondary");
            }

            & > *:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }
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