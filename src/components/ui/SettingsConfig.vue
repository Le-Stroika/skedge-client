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
            icon-name="settings"
            :class="['SettingsCog', cogClass]"
            :id="[cogId]"
            :style="[cogStyle]"
            size="3rem"
            ref="cogRef"
            @click="toggleMenu"
        />

        <!-- Tooltip menu -->
        <template slot="popover">
            <tooltip-base
                :class="['SettingsTooltip', tooltipClass]"
                :id="[tooltipId]"
                :style="[tooltipStyle]"
                container-class="SettingsTooltip__container"
            >
                <div class="SettingsTooltip__header">
                    <div class="SettingsTooltip__header-text">
                        General Settings
                    </div>
                    <icon-clickable 
                        icon-name="close"
                        class="SettingsTooltip__header-close"
                        @click="closeMenu"
                        size="2.3rem"
                    />
                </div>

                <div class="SettingsTooltip__theme-select">
                    <div class="SettingsTooltip__theme-select-title">
                        Theme
                    </div>
                    <theme-select></theme-select>
                </div>

                <div class="SettingsTooltip__campus-select">
                    <div class="SettingsTooltip__campus-select-title">
                        Search Campuses
                    </div>
                    <campus-search>
                    </campus-search>
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

import ThemeSelect from "@/components/settings/ThemeSelect.vue";
import CampusSearch from "@/components/settings/CampusSearch.vue";

const ANIM_DURATION = 0.3;

const INIT_OPEN = false;

export default {
    components: {
        iconClickable: IconClickable,
        tooltipBase: TooltipBase,
        campusSearch: CampusSearch,
        themeSelect: ThemeSelect
    },
    data() {
        return {
            open: INIT_OPEN
        }
    },
    props: {
        cogClass: {
            type: String,
            default: null
        },
        cogId: {
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
        tooltipId: {
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

        will-change: transform;
    }
    
    .SettingsTooltip {
        // This accomplishes the "margin" effect without blowing up v-tooltip
        padding: 0.3rem 0.5rem 0.3rem 0.5rem;

        max-width: 28rem;
        width: 100vw;

        & .SettingsTooltip__container {

            display: flex;
            flex-direction: column;

            padding: 1rem;
            padding-bottom: 1.5rem;

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
                color: color-link("GLOBAL", "text_color", "secondary");

                & .SettingsTooltip__theme-select-title {
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
            }

            & .SettingsTooltip__campus-select {
                color: color-link("GLOBAL", "text_color", "secondary");

                & .SettingsTooltip__campus-select-title {
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
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
                will-change: transform;
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