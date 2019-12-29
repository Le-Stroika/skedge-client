<template>
    <div 
        :class="['BaseNotification', baseClass]"
        :style="[baseStyle]"
        :id="[baseId]"
    >
        <icon-clickable
            icon-name="close"
            :class="['BaseNotification__close', closeClass]"
            :style="[closeStyle]"
            :id="[closeId]"
            size="2.5rem"
            @click="props.close"
        />

        <div 
            :class="['BaseNotification__icon', iconClass]"
            :style="[iconStyle]"
            :id="[iconId]"
        >
            <icon-base 
                :icon-name="iconName"
                size="4rem"
            />
        </div>

        <div 
            :class="['BaseNotification__title', titleClass]"
            :style="[titleStyle]"
            :id="[titleId]"
        >
            {{ props.item.title }}
        </div>

        <div 
            :class="['BaseNotification__text', textClass]"
            :style="[textStyle]"
            :id="[textId]"
        >
            {{ props.item.text }}
        </div>
    </div>
</template>

<script>
import IconClickable from "@/components/ui/icons/IconClickable.vue";
import IconBase from "@/components/ui/icons/IconBase.vue";

export default {
    components: {
        IconClickable,
        IconBase
    },
    props: {
        // Passed in from Vue-Notifications
        props: {
            type: Object,
            required: true
        },
        iconName: {
            type: String,
            default: "info"
        },
        // Style classes
        baseClass: {
            type: String,
            default: null
        },
        baseStyle: {
            type: Object,
            default: null
        },
        baseId: {
            type: String,
            default: null
        },
        iconClass: {
            type: String,
            default: null
        },
        iconStyle: {
            type: Object,
            default: null
        },
        iconId: {
            type: String,
            default: null
        },
        titleClass: {
            type: String,
            default: null
        },
        titleStyle: {
            type: Object,
            default: null
        },
        titleId: {
            type: String,
            default: null
        },
        textClass: {
            type: String,
            default: null
        },
        textStyle: {
            type: Object,
            default: null
        },
        textId: {
            type: String,
            default: null
        },
        closeClass: {
            type: String,
            default: null
        },
        closeStyle: {
            type: Object,
            default: null
        },
        closeId: {
            type: String,
            default: null
        },
    }
}
</script>

<style lang="scss">
    $width: 450px;

    // Override the width styles that the library puts in
    // b/c by default the notification does not shrink when the screen is too small
    .vue-notification-group {
        max-width: $width !important;
        width: 100% !important;
    }

    .BaseNotification {
        position: relative;

        display: flex;
        flex-direction: row;
        align-items: center;

        // Note: this should be overrided by the components that use it
        background-color: color-link("GLOBAL", "background_color", "secondary");

        box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.3);

        border-radius: 0.3rem;

        margin: 0.52rem 1rem;

        padding: 1rem 2.5rem 1rem 1rem;

        & .BaseNotification__close {
            position: absolute;
            top: 0;
            right: 0;

            margin: 0.2rem;
        }

        & .BaseNotification__icon {
            margin-right: 0.5rem;
        }

        & .BaseNotification__title {
            font-weight: bold;
            margin-right: 0.4rem;
        }

        * .BaseNotification__text {

        }
    }
</style>