<template>
    <span
        class="BaseIcon"
        @click="$emit('click', $event)"
    >
        <md-icon 
            :style="iconStyles"
        >
            <slot></slot>
        </md-icon>
    </span>
</template>

<script>
import * as Utilities from "../../../utilities";

export default {
    props: {
        size: {
            type: String,
            validator: Utilities.isCSSLength,
            default: "3rem"
        }
    },
    computed: {
        iconStyles() {
            return Utilities.getIconSizeCSSStyles(this.size);
        }
    }
}
</script>