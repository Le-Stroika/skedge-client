<template>
    <!-- Header locked -->
    <div 
        v-if="lock"
        class="HeaderLock"
    >
        <div 
            class="HeaderLock__header-outliner"
            :style="headerOutlinerComputedStyles"
            ref="headerOutliner"
        >
            <div 
                :class="['HeaderLock__header', 'locked', headerClass]"
                :style="[headerComputedStyles, headerStyle]"
                :id="[headerId]"
                ref="headerEl"
            >
                <slot name="header"></slot>
            </div>
        </div>

        <overlay-scrollbar 
            v-if="lock"
            class="HeaderLock__scroll-container"
            :options="{ 
                paddingAbsolute: true,
                scrollbars: {
                    autoHide: 'leave'
                },
                callbacks: { 
                    onScroll: onContainerScroll 
                } 
            }"
        >
            <div 
                :class="['HeaderLock__container', headerClass]"
                :style="[headerStyle]"
                :id="[headerId]"
            >
                <div 
                    class="HeaderLock__sidebar"
                    ref="sidebarEl"
                >
                    <slot name="sidebar"></slot>
                </div>

                <div 
                    class="HeaderLock__content"
                    ref="contentEl"
                >
                    <slot></slot>
                </div>
            </div>
        </overlay-scrollbar>
    </div>

    <!-- Header not locked -->
    <overlay-scrollbar 
        v-else
        class="HeaderLock"
    >
        <div 
            :class="['HeaderLock__header', headerClass]"
            :style="[headerComputedStyles, headerStyle]"
            :id="[headerId]"
        >
            <slot name="header"></slot>
        </div>
        
        <div 
            :class="['HeaderLock__container', headerClass]"
            :style="[headerStyle]"
            :id="[headerId]"
        >
            <div 
                class="HeaderLock__sidebar"
                ref="sidebarEl"
            >
                <slot name="sidebar"></slot>
            </div>

            <div 
                class="HeaderLock__content"
                ref="contentEl"
            >
                <slot></slot>
            </div>
        </div>
    </overlay-scrollbar>
</template>

<script>
import * as Utilities from "../../utilities";

const DEBOUNCE_RATE = 20;

export default {
    data() {
        return {
            onResizeDebounced: Utilities.debounce(this.onResize, DEBOUNCE_RATE),
            headerWidth: "auto",
            headerLeftPadding: "0px",
            headerOutlinerHeight: "auto",
        }
    },
    props: {
        lock: {
            type: Boolean,
            default: false
        },
        // Internal class props
        headerClass: {
            type: String,
            default: null
        },
        headerStyle: {
            type: Object,
            default: null
        },
        headerId: {
            type: String,
            default: null
        },
        contentClass: {
            type: String,
            default: null
        },
        contentStyle: {
            type: Object,
            default: null
        },
        contentId: {
            type: String,
            default: null
        }
    },
    computed: {
        headerOutlinerComputedStyles() {
            return {
                'height': this.headerOutlinerHeight
            }
        },
        headerComputedStyles() {
            return {
                'width': `calc(${this.headerWidth} + ${this.headerLeftPadding})`,
                'padding-left': this.headerLeftPadding
            }
        }
    },
    methods: {
        computeHeaderStylings() {
            // --- Compute header width ---
            if (this.lock) {
                const contentEl = this.$refs.contentEl;
                this.headerWidth = `${contentEl.scrollWidth}px`;
            }

            // --- Compute padding-left amount ---
            const sidebarEl = this.$refs.sidebarEl;
            this.headerLeftPadding = `${sidebarEl.offsetWidth}px`;
        },
        computeHeaderOutlinerStylings() {
            if (!this.lock) return;

            // const headerOutlinerEl = this.$refs.headerOutlinerEl;
            const headerEl = this.$refs.headerEl;

            this.headerOutlinerHeight = `${headerEl.offsetHeight}px`
        },
        onContainerScroll(e) {
            if (!this.lock) return;

            const headerEl = this.$refs.headerEl;

            // --- Compute the header "scroll" amount ---
            // this is emulated by moving the absolutely positioned header element's
            // left property by the amount the container has scrolled
            headerEl.style.left = `${-1 * e.target.scrollLeft}px`;
        },
        onResize() {
            this.computeHeaderStylings();
            this.computeHeaderOutlinerStylings();
        },
        // NOTE: intermediate functions, do not use
        __onResize__() {
            this.onResizeDebounced();
        }
    },
    mounted() {
        // Setup html event listeners
        this.$nextTick(() => {
            // Setup window resize event
            window.addEventListener('resize', this.__onResize__);
            // Fire resize event on load (for initialization purposes)
            this.__onResize__();
        });
    },
    beforeDestroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.__onResize__);
    }
}
</script>

<style lang="scss" scoped>
    .HeaderLock {
        display: flex;
        flex-direction: column;

        & .HeaderLock__header-outliner {
            position: relative;

            overflow: hidden;

            & .HeaderLock__header {
                &.locked {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                flex-grow: 0;
                flex-shrink: 0;

                overflow: visible;
            }
        }

        & .HeaderLock__scroll-container {
            flex-grow: 1;
            flex-shrink: 1;    
        }

        & .HeaderLock__container {
            display: flex;
            flex-direction: row;

            & .HeaderLock__sidebar {
                flex-grow: 0;
                flex-shrink: 0;
            }

            & .HeaderLock__content {
                flex-grow: 1;
                flex-shrink: 1;
            }
        }
    }
</style>