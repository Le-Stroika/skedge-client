<template>
    <!-- Router-link -->
    <router-link
        v-if="useRouterLink"
        :class="['Button', { disabled: disabled }]"
        :to="to"
        :tag="tag"
    >
        <a 
            :style="widthConstraintStyles"
            @click="onClick"
        >
            <slot></slot>
        </a>
    </router-link>
    <!-- Custom component -->
    <component 
        :is="tag" 
        v-else
        :class="['Button', { disabled: disabled }]"
    >
        <a 
            :href="href"
            :style="widthConstraintStyles"
            @click="onClick"
        >
            <slot></slot>
        </a>
    </component> 
</template>

<script>
import { CSSLength } from "../../customValidators";

export default {
    props: {
        minWidth: {
            type: String, 
            validator: CSSLength,
            default: "8rem"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        to: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "div"
        }
    },
    computed: {
        widthConstraintStyles() {
            return {
                minWidth: this.minWidth
            }
        },
        useRouterLink() {
            return !!this.to;
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
    .Button {
        display: inline-block;

        font-weight: 600;

        color: color-link("ButtonBase", "text_color", "primary");
        background-color: color-link("ButtonBase", "accent_color", "primary");

        transition: background-color 0.5s;

        border: 0;
        border-radius: 0.7rem;

        text-align: center;

        & > a {
            cursor: pointer;
            display: inline-block;
            margin: 1rem 1.5rem;
            
            text-decoration: none;
            color: color-link("ButtonBase", "text_color", "primary");
        }

        &:hover {
            background-color: color-link("ButtonBase", "selected_color", "primary");
        }

        &.disabled, &:disabled {
            & > a {
                cursor: initial;
                color: color-link("ButtonBase", "text_color", "secondary");
            }

            background-color: color-link("ButtonBase", "disabled_color", "primary");

            &:hover {
                background-color: color-link("ButtonBase", "disabled_color", "primary");
            }
        }
    }
</style>