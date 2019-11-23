<template>
    <div class="TooltipBase">
        <div 
            :class="['TooltipBase__container', containerClass]"
            :id="[containerId]"
            :style="[containerStyle]"
        >
            <slot></slot>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        containerClass: {
            type: String, 
            default: null
        },
        containerId: {
            type: String, 
            default: null
        },
        containerStyle: {
            type: Object,
            default: null
        }
    }
}
</script>

<style lang="scss">
// Note: can not be scoped b/c of the popover stylings

    .TooltipBase {
        // Note: doing this allows for "margins" (via padding) to be put on the 
        // base class without v-tooltip screwing it up

        & .TooltipBase__container {
            padding: 0.7rem;
            border-radius: 0.4rem;

            background-color: color-link("GLOBAL", "background_color", "secondary");

            box-shadow: -2px 2px 5px 0px rgba(0,0,0,0.2);
        }
    }


    // Default transitions
    .tooltip {
        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity .15s, visibility .15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity .15s;
        }
    }
</style>