<template>
    <div 
        class="BaseIcon"
        :style="styles"
    >
        <component 
            class="BaseIcon__container"
            @click="$emit('click', $event)"
            :is="iconNameNormalized"
        ></component>
    </div>
</template>

<script>
import * as Utilities from "../../../utilities";

export default {
    props: {
        size: {
            type: String,
            validator: Utilities.isCSSLength,
            default: "3rem"
        },
        iconName: {
            type: String,
            required: true
        }
    },
    computed: {
        iconNameNormalized() {
            if (!this.iconName.endsWith("-icon") && !this.iconName.endsWith("Icon")) {
                return `${this.iconName}-icon`;
            }

            return this.iconName;
        },
        styles() {
            return {
                height: this.size,
                width: this.size
            }
        }
    }
}
</script>

<style lang="scss">
    .BaseIcon {
        display: flex;

        & .BaseIcon__container {
            width: 100%;
            height: 100%;
        }

        & /deep/ svg {
            display: block;

            width: 100%;
            height: 100%;
        }
    }
</style>