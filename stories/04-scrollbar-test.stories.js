export default {
    title: "Scrollbar Tests"
};

export const main = () => ({
    components: {

    },
    template: `
        <overlay-scrollbar
            :style="{
                'height': '100%',
                'background-color': '#4B4B4B'
            }"
        >
            <div 
                v-for="n in 30"
                :key="n"
                :style="{
                    'white-space': 'nowrap'
                }"
            >
                Super duper really long item thats even longer than you would expect {{ n }}
            </div>
        </overlay-scrollbar>
    `
});