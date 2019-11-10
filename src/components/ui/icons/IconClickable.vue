<template>
    <icon-base
        :class="['IconClickable', disabled ? 'disabled' : '']"
        v-bind="$attrs"
        @click="onClick"
    >
        <slot></slot>
    </icon-base>
</template>

<script>
import IconBase from "@/components/ui/icons/IconBase.vue";

export default {
    components: {
        iconBase: IconBase
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick(e) {
            if (this.disabled) {
                e.preventDefault();
                return;
            }

            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .IconClickable {
        $duration: 0.15s;

        color: color-link("global", "text_color", "primary");
        cursor: pointer;

        transition: color $duration;

        & i {
            transition: color $duration;
        }

        &:hover {
            color: color-link("global", "text_color", "secondary");
        }

        &.disabled {
            cursor: inherit;

            color: color-link("global", "disabled_color", "primary");

            &:hover {
                color: color-link("global", "disabled_color", "primary");
            }
        }
    }
</style>