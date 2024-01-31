<template v-if="optionList">
    <option
        v-for="(option, index) of optionList"
        :key="index"
        :disabled="option.disabled"
        :selected="option.selected"
        :value="option.value"
    >
        {{ option.label }}
    </option>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
}

export default defineComponent({
    name: "BasicOption",
    props: {
        optionList: {
            // Array of <option>. Option object has keys: label, value, disabled, selected.
            type: Array as PropType<Option[]>,
            required: true,
        },
    },
});
</script>
