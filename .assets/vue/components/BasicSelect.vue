<template>
    <div class="basic-select" :class="selectWrapperClass">
        <label :for="selectName">{{ selectLabel }}</label>
        <select
            :class="selectClass"
            :id="selectName"
            :name="selectName"
            :autocomplete="selectAutocomplete"
            :autofocus="selectAutofocus"
            :disabled="selectDisabled"
            :form="selectForm"
            :multiple="selectMultiple"
            :required="selectRequired"
            :size="selectSize"
            :value="selectValue"
        >
            <template v-if="selectOptions">
                <BasicOption :optionList="selectOptions" />
            </template>
            <template v-if="selectOptionsGroup">
                <optgroup
                    v-for="(optionGroup, index) of selectOptionsGroup"
                    :key="index"
                    :disabled="optionGroup.disabled"
                    :label="optionGroup.label"
                >
                    <BasicOption :optionList="optionGroup.options" />
                </optgroup>
            </template>
        </select>
    </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue";
import BasicOption from "./BasicOption.vue";

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
}

interface OptionGroup {
    label: string;
    disabled?: boolean;
    options: Option[];
}

export default defineComponent({
    name: "BasicSelect",
    components: { BasicOption },
    props: {
        selectWrapperClass: {
            // custom wrapper Class.
            type: String,
            required: false,
        },
        selectClass: {
            // custom Class.
            type: String,
            required: false,
        },
        selectAutocomplete: {
            // ["on", "off", "given-name", "additional-name", "family-name", "email", "new-password", "current-password", "street-address", "postal-code", ...].
            type: String,
            required: false,
        },
        selectAutofocus: {
            // Determine if have input focus when the page loads.
            type: Boolean,
            required: false,
        },
        selectDisabled: {
            // The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form.
            type: Boolean,
            required: false,
            default: false,
        },
        selectForm: {
            // must match the id of a <form> element with which the input is associated.
            type: String,
            required: false,
        },
        selectName: {
            // Name of the form control. Submitted with the form as part of a name/value pair.
            type: String,
            required: true,
        },
        selectMultiple: {
            // Boolean. Whether to allow multiple options can be selected in the list.
            type: Boolean,
            required: false,
        },
        selectRequired: {
            // The Boolean required attribute, if present, indicates that the user must specify a value for the input before the owning form can be submitted.
            type: Boolean,
            required: false,
            default: false,
        },
        selectSize: {
            // the number of rows in the list that should be visible at one time.
            type: Number,
            required: false,
        },
        selectOptions: {
            // Array of <option>. Option object has keys: label, value, disabled, selected.
            type: Array as PropType<Option[]>,
            required: false,
        },
        selectOptionsGroup: {
            // Array of <optgroup>. Optgroup object has keys: label, disabled and Options array.
            type: Array as PropType<OptionGroup[]>,
            required: false,
        },
        selectValue: {
            // The initial value of the control.
            type: String,
            required: false,
        },
        selectLabel: {
            // text for the <label> element.
            type: String,
            required: true,
        },
    },
});
</script>
