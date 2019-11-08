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
export default {
    props: {
        minWidth: {
            type: String, // TODO: add custom check for CSS length
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
        @include standard-button-styles();
    }
</style>