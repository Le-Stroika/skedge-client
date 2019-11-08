<template>
    <div class="Home">
        <div class="Home__content">
            Home
            <br>
            <button-base
                min-width="5rem"
            >
                Hi
            </button-base>
        </div>
    </div>
</template>

<script>
import ButtonBase from "@/components/ui/ButtonBase.vue"

export default {
    components: {
        buttonBase: ButtonBase
    },
    name: 'home',
}
</script>


<style lang="scss" scoped>
    .Home {
        width: 100%;
        height: 100%;

        // Center content
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & .Home__content {

        }
    }
</style>