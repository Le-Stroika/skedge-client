<template>
    <div class="TooltipBase">
        <slot></slot>
    </div>    
</template>

<script>
export default {

}
</script>

<style lang="scss">
// Note: can not be scoped b/c of the popover stylings

    .TooltipBase {
        border-radius: 0.4rem;

        background-color: color-link("global", "background_color", "secondary");

        padding: 0.6rem;

        box-shadow: -2px 2px 5px 0px rgba(0,0,0,0.2);
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