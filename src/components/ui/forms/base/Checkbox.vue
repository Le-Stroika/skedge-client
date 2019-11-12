<template>
    <label 
        :class="['Checkbox', (disabled) ? 'disabled' : '']"
    >
        <input 
            class="Checkbox__input"
            type="checkbox" 
            :diabled="disabled"
            :checked="value"
            @change="updateValue"
            v-bind="$attrs"
        >
        <span
            :class="['Checkbox__pseudo-checkbox', checkboxClass]"
            :id="[checkboxId]"
            :style="[checkboxStyle]"
        >
        </span>
    </label>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        // Inner class/id/styles
        checkboxClass: {
            type: String,
            default: null
        },
        checkboxId: {
            type: String,
            default: null
        },
        checkboxStyle: {
            type: Object,
            default: null
        },
        // v-model passthrough
        value: Boolean,
    },
    methods: {
        // v-model passthrough
        updateValue(e) {
            this.$emit("input", e.target.checked);
        }
    }
}
</script>

<style lang="scss" scoped>
    $size: 24px; // Even values work best
    $speed: 0.2s;

    .Checkbox {
        display: inline-block;
        position: relative;

        height: $size;
        width: $size;

        & .Checkbox__input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        & .Checkbox__pseudo-checkbox {
            position: absolute;
            top: 0;
            left: 0;

            height: $size;
            width: $size;

            border-radius: 0.5rem;

            background-color: color-link("Checkbox", "background_color", "primary");

            cursor: pointer;

            transition: background-color $speed, box-shadow $speed;

            // &:hover {
            //     background-color: color-link("Checkbox", "background_color", "secondary");
            // }

            &::after {
                content: '';
                position: absolute;

                opacity: 0;

                // Sizing/alingment styles
                $shrinkBy: 0px; // Even numbers work best
                top: $shrinkBy/2;
                left: $shrinkBy/2;
                height: calc(#{$size} - #{$shrinkBy});
                width: calc(#{$size} - #{$shrinkBy});

                border-radius: 0.2rem;

                background-color: color-link("Checkbox", "background_color", "tertiary", 1);

                transition: opacity $speed, width $speed, height $speed, 
                    top $speed, left $speed;
            }
        }

        &:hover {
            & .Checkbox__pseudo-checkbox {
                background-color: color-link("Checkbox", "background_color", "secondary");
            }
        }

        &:hover .Checkbox__input:checked + .Checkbox__pseudo-checkbox {
            background-color: color-link("Checkbox", "selected_color", "secondary");
        }

        & .Checkbox__input:checked + .Checkbox__pseudo-checkbox {
            background-color: color-link("Checkbox", "selected_color", "primary");

            // &:hover {
            //     background-color: color-link("Checkbox", "selected_color", "secondary");
            // }

            &::after {
                opacity: 1;

                // Sizing/alingment styles
                $shrinkBy: 10px; // Even numbers work best
                top: $shrinkBy/2;
                left: $shrinkBy/2;
                height: calc(#{$size} - #{$shrinkBy});
                width: calc(#{$size} - #{$shrinkBy});
            }
        }

        // Focused state
        &:focus {
            outline: none;

            & .Checkbox__pseudo-checkbox {
                box-shadow: 0 0 0 1px color-link("Checkbox", "text_color", "primary", 0.4);
            }
        }


        // Disabled state
        &.disabled {
            pointer-events: none;

            & .Checkbox__pseudo-checkbox {
                cursor: initial;

                background-color: color-link("Checkbox", "disabled_color", "primary");
            }

            & .Checkbox__input:checked + .Checkbox__pseudo-checkbox {
                background-color: color-link("Checkbox", "disabled_color", "primary");

                &::after { 
                    background-color: color-link("Checkbox", "disabled_color", "secondary", 0.7);
                }
            }
        }
    }
</style>