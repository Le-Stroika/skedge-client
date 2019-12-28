import Vue from "vue";

// Icons used in application
import CloseIcon from "vue-material-design-icons/Close.vue";
import AddIcon from "vue-material-design-icons/Plus.vue";
import SettingsIcon from "vue-material-design-icons/Settings.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import InfoIcon from "vue-material-design-icons/InformationOutline.vue";
import WarningIcon from "vue-material-design-icons/AlertOutline.vue";
import ErrorIcon from "vue-material-design-icons/AlertCircleOutline.vue";
import CheckIcon from "vue-material-design-icons/CheckCircleOutline.vue";
import ShareIcon from "vue-material-design-icons/ShareVariant.vue";
import RightArrowIcon from "vue-material-design-icons/ChevronRight.vue";
import LeftArrowIcon from "vue-material-design-icons/ChevronLeft.vue";

const ICONS_MAP = {
    CloseIcon,
    AddIcon,
    SettingsIcon,
    MenuIcon,
    InfoIcon,
    WarningIcon,
    ErrorIcon,
    CheckIcon,
    ShareIcon,
    RightArrowIcon,
    LeftArrowIcon
};

export function registerIcons() {
    // Register each icon globally
    Object.entries(ICONS_MAP).forEach(([name, component]) => {
        Vue.component(name, component);
    });
}