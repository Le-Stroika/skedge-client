<template>
    <button 
        class="Button" 
        :style="baseStyles"
    >
        <slot></slot>
    </button>    
</template>

<script>
export default {
    props: {
        minWidth: {
            type: String,
            default: "5rem"
        }
    },
    computed: {
        baseStyles() {
            return {
                minWidth: this.minWidth
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/styles/helpers.scss";

    .Button {
        @include standard-button-styles();
    }
</style>