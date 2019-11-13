<template>
    <label 
        :class="['CheckboxField', (disabled) ? 'disabled' : '']"
        @click.prevent="onClick"
    >
        <checkbox 
            class="CheckboxField__checkbox"
            display-content
            :disabled="disabled"
            :value="value"
            @input="updateValue"
        >
            <slot></slot>
        </checkbox>
    </label>
</template>

<script>
import Checkbox from "@/components/ui/forms/base/Checkbox.vue";

export default {
    components: {
        checkbox: Checkbox
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // v-model passthrough
        value: Boolean
    },
    methods: {
        // v-model passthrough
        updateValue(checked) {
            this.$emit("input", checked);
        },
        onClick(e) {
            if (this.disabled) {
                e.preventDefault();
                return;
            }

            this.$emit("click", this.value);
        }
    }
}
</script>

<style lang="scss" scoped>
    .CheckboxField {
        display: flex;
        flex-direction: row;
        align-items: center;

        & .CheckboxField__content {
            color: color-link("global", "text_color", "primary");

            margin-left: 0.5rem;
            font-size: 2.3rem;
            line-height: 2rem;

            cursor: pointer;

            transition: color 0.2s;
        }

        &.disabled {
            pointer-events: none;

            & .CheckboxField__content {
                color: color-link("global", "text_color", "secondary");

                cursor: initial;
            }
        }
    }
</style>