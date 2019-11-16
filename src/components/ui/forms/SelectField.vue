<template>
    <v-select 
        :class="['SelectField']"
        :disable="disabled"
        v-bind="$attrs"
        @input="$emit('input', $event)"
        @option:created="$emit('option:created', $event)"
        @search:blur="$emit('search:blur')"
        @search:focus="$emit('search:focus')"
    ></v-select>
</template>

<script>
export default {
    props: {
        disabled: { 
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .SelectField {
        // Override styles given by vue-select

        & /deep/ .vs__dropdown-toggle {
            background-color: color-link("SelectField", "background_color", "primary");
            border: none;

            & .vs__selected-options {
                & .vs__search {
                    color: color-link("SelectField", "text_color", "primary");

                    // Disabled this annoying webkit clear button pseudo element
                    &::-webkit-search-cancel-button {
                        -webkit-appearance: none;
                    }
                }
            }

            & .vs__selected {
                color: color-link("SelectField", "text_color", "primary");
            }

            & .vs__actions {
                & .vs__clear {
                    fill: color-link("SelectField", "text_color", "secondary");
                }

                & .vs__open-indicator { // svg
                    fill: color-link("SelectField", "text_color", "secondary");
                }

                & .vs__spinner {
                    
                }
            }
        }

        & /deep/ .vs__dropdown-menu {
            color: color-link("SelectField", "text_color", "primary");
            background-color: color-link("SelectField", "background_color", "secondary");
            border: none;
            border-top: 1px solid color-link("SelectField", "background_color", "tertiary", 0.5);

            & .vs__dropdown-option {
                color: color-link("SelectField", "text_color", "primary");

                transition: background-color 0.2s;

                &.vs__dropdown-option--selected {
                    
                }

                &.vs__dropdown-option--highlight {
                    background-color: color-link("SelectField", "selected_color", "primary");
                }
            }

            & .vs__no-options {
                padding: 15px 4px;
                color: color-link("SelectField", "text_color", "secondary");
            }
        }

        // Disabled state;
        &.vs--disabled {
            & /deep/ .vs__dropdown-toggle {
                cursor: inherit;

                & .vs__selected-options {
                    cursor: inherit;

                    & .vs__search {
                        cursor: inherit;
                        background: none;
                    }
                }
            }

            & .vs__actions {
                & .vs__open-indicator { // svg
                    cursor: inherit;

                    background: none;
                    fill: color-link("SelectField", "text_color", "secondary", 0.5);
                }
            }
        }
    }
</style>