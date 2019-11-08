<template>
    <div class="Home">
        <div class="Home__content">
            <h1 class="Home__logo">
                S<span class="Home__logo-k">k</span>edge
            </h1>
            <div class="Home__description">
                A schedule maker for the University of Toronto
            </div>
            <div class="Home__campus-select">
                <div class="Home__campus-select-title">
                    Select Campuses
                </div>
                <div class="Home__campus-select-options">
                    TODO: add campus options
                </div>
            </div>
            <div class="Home__navigation">
                <div class="Home__navigation-title">
                    Create Schedule For
                </div>
                <div class="Home__navigation-items">
                    <button-base
                        min-width="20rem"
                    >
                        Fall-Winter
                    </button-base>

                    <button-base
                        min-width="20rem"
                    >
                        Summer
                    </button-base>
                </div>
            </div>
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

        background-color: color-link("HomeView", "background_color", "primary");
        color: color-link("HomeView", "text_color", "primary");

        // Center content
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & .Home__content {
            // Center content
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & > *:not(:last-child) {
                margin-bottom: 1rem;
            }

            & .Home__logo {
                font-size: 5rem;
                line-height: 6.5rem;

                & .Home__logo-k {
                    font-size: 5rem;
                    line-height: 6.5rem;
                    font-weight: 800;
                    color: color-link("HomeView", "accent_color", "secondary");
                }
            }

            & .Home__description {
                color: color-link("HomeView", "text_color", "secondary");

                text-align: center;
            }

            & .Home__campus-select {
                // Horizontal center
                display: flex;
                flex-direction: column;
                align-items: center;

                & .Home__campus-select-title {
                    font-weight: 500;

                    text-align: center;
                }

                & .Home__campus-select-options {
                    color: color-link("HomeView", "text_color", "secondary");

                    text-align: center; // TODO: might not need
                }
            }

            & .Home__navigation {
                // Horizontal center
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                & .Home__navigation-title {
                    font-weight: 500;
                }

                & .Home__navigation-items {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;

                    & > * {
                        margin-top: 1rem;
                    }

                    & > *:not(:last-child) {
                        margin-right: 0.5rem;
                    }
                }
            }
        }
    }
</style>