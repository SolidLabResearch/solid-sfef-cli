<template v-if="fieldsetInputs && ['checkbox', 'radio'].includes(fieldsetType)">
    <fieldset
        :class="fieldsetClass"
        :disabled="fieldsetDisabled"
        :form="fieldsetForm"
        :name="fieldsetName"
    >
        <legend :class="fieldsetLegendClass" v-html="fieldsetLegend" />
        <BasicInput
            v-for="(input, index) of fieldsetInputs"
            :key="index"
            inputWrapperClass="label-after"
            :inputType="fieldsetType"
            :inputId="typeof input.id === 'undefined' ? input.value : input.id"
            :inputName="fieldsetName"
            :inputForm="fieldsetForm"
            :inputLabel="input.label"
            :inputDisabled="input.disabled"
            :inputChecked="input.checked"
            :inputRequired="input.required"
            :inputValue="input.value"
        />
    </fieldset>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";
import BasicInput from "./BasicInput.vue";

interface Input {
    label: string;
    value: string;
    id?: string;
    disabled?: boolean;
    checked?: boolean;
    required?: boolean;
}

export default defineComponent({
    name: "BasicFieldset",
    components: { BasicInput },
    props: {
        fieldsetClass: {
            // custom Class.
            type: String,
            required: false,
        },
        fieldsetLegendClass: {
            // custom Class.
            type: String,
            required: false,
        },
        fieldsetForm: {
            type: String,
        },
        fieldsetName: {
            type: String,
        },
        fieldsetDisabled: {
            type: Boolean,
        },
        fieldsetLegend: {
            type: String,
        },
        fieldsetType: {
            type: String,
        },
        fieldsetInputs: {
            // Array of <inputs>. Input object has keys: label, value, disabled, selected.
            type: Array as PropType<Input[]>,
            required: true,
        },
    },
});
</script>
