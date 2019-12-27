<template>
    <notifications
        v-bind="$attrs"
    >
        <template slot="body" slot-scope="props">
            <div class="BaseNotification">
                <icon-clickable
                    icon-name="close"
                    class="BaseNotification__close"
                    size="3rem"
                    @click="props.close"
                />

                <div class="BaseNotification__icon">
                    <slot name="icon"></slot>
                </div>

                <div class="BaseNotification__title">
                    {{ props.item.title }}
                </div>

                <div class="BaseNotification__text">
                    {{ props.item.text }}
                </div>
            </div>
        </template>
    </notifications>
</template>

<script>
import IconClickable from "@/components/ui/icons/IconClickable.vue";

export default {
    components: {
        IconClickable,
    }
}
</script>

<style lang="scss" scoped>

</style>