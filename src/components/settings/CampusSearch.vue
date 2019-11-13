<template>
    <div class="CampusSearch">
        <checkbox-field 
            class="CampusSearch__campus-select"
            :value="select_utsg"
            @click="onSelectCampusClick(CAMPUS_KEYS.UTSG, $event)"
        >
            UTSG
        </checkbox-field>
        <checkbox-field 
            class="CampusSearch__campus-select"
            :value="select_utm"
            @click="onSelectCampusClick(CAMPUS_KEYS.UTM, $event)"
        >
            UTM
        </checkbox-field>
        <checkbox-field 
            class="CampusSearch__campus-select"
            :value="select_utsc"
            @click="onSelectCampusClick(CAMPUS_KEYS.UTSC, $event)"
        >
            UTSC
        </checkbox-field>
    </div>
</template>

<script>
import CheckboxField from "@/components/ui/forms/CheckboxField.vue";

import { mapState, mapActions } from "vuex";
import { actionTypes } from "../../store/types";
import CAMPUS_KEYS from "../../constants/campusKeys";

export default {
    components: {
        checkboxField: CheckboxField
    },
    data() {
        return {
            CAMPUS_KEYS: { ...CAMPUS_KEYS }
        }
    },
    computed: {
        ...mapState({
            select_utsg: (state) => state.general.searchCampuses[CAMPUS_KEYS.UTSG],
            select_utm: (state) => state.general.searchCampuses[CAMPUS_KEYS.UTM],
            select_utsc: (state) => state.general.searchCampuses[CAMPUS_KEYS.UTSC]
        })
    },
    methods: {
        ...mapActions({
            setSearchCampus: actionTypes.SET_SEARCH_CAMPUS
        }),
        onSelectCampusClick(campusKey, search) {
            this.setSearchCampus({ campusKey, search: !search });
        }
    }
}
</script>

<style lang="scss" scoped>
    .CampusSearch {
        & > .CampusSearch__campus-select:not(:last-child) {
            margin-bottom: 0.3rem;
        }
    }
</style>