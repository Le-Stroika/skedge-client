<template>
    <label 
        :class="['CheckboxField', (disabled) ? 'disabled' : '']"
        @click.prevent="onClick"
    >
        <checkbox 
            class="CheckboxField__checkbox"
            :disabled="disabled"
            :value="value"
            @input="updateValue"
        >
        </checkbox>
        <div class="CheckboxField__content">
            <slot></slot>
        </div>
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

        &:hover {
            // NOTE: this is really hacky as it is essentially applying the internal hover styles
            // of the Checkbox component when the wrapper label is hovered over
            // This should be fixed at some point -- TODO: fix
            & .CheckboxField__checkbox {
                & /deep/ .Checkbox__pseudo-checkbox {
                    background-color: color-link("Checkbox", "background_color", "secondary");
                }

                &:checked /deep/ .Checkbox__input:checked + .Checkbox__pseudo-checkbox {
                    background-color: color-link("Checkbox", "selected_color", "secondary");
                }
            }
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