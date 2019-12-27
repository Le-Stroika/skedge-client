<template>
    <icon-base
        :class="['IconClickable', disabled ? 'disabled' : '']"
        v-bind="$attrs"
        @click="onClick"
    ></icon-base>
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

        color: color-link("GLOBAL", "text_color", "primary");
        cursor: pointer;

        transition: color $duration;

        & i {
            transition: color $duration;
        }

        &:hover {
            color: color-link("GLOBAL", "text_color", "secondary");
        }

        &.disabled {
            cursor: inherit;

            color: color-link("GLOBAL", "disabled_color", "primary");

            &:hover {
                color: color-link("GLOBAL", "disabled_color", "primary");
            }
        }
    }
</style>