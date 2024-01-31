<!-- all input types except checkbox, radio, and buttons -->
<template>
    <div class="basic-input label-block-- label-after-- label-float--" :class="inputWrapperClass">
        <label v-if="!inputAdditionalInfo" :class="inputLabelClass" :for="inputId">
            {{ inputLabel }}
        </label>
        <div v-else :class="inputLabelClass">
            <label :for="inputId">{{ inputLabel }} </label>
            <span :id="inputId + '-info'" :class="inputLabelInfoClass">
                {{ inputAdditionalInfo }}
            </span>
        </div>
        <input
            :class="inputClass"
            :type="inputType"
            :id="inputId"
            :name="inputName"
            :accept="inputAccept"
            :alt="inputType === 'image' ? inputAlt : null"
            :autocomplete="['checkbox', 'radio'].includes(inputType) ? null : inputAutocomplete"
            :capture="inputType === 'file' ? inputCapture : null"
            :checked="['checkbox', 'radio'].includes(inputType) ? inputChecked : null"
            :dirname="
                ['hidden', 'text', 'search', 'url', 'tel', 'email'].includes(inputType)
                    ? inputDirname
                    : null
            "
            :disabled="inputDisabled"
            :form="inputForm"
            :formaction="['image', 'submit'].includes(inputType) ? inputFormaction : null"
            :formenctype="['image', 'submit'].includes(inputType) ? inputFormenctype : null"
            :formmethod="['image', 'submit'].includes(inputType) ? inputFormmethod : null"
            :formnovalidate="['image', 'submit'].includes(inputType) ? inputFormnovalidate : null"
            :formtarget="['image', 'submit'].includes(inputType) ? inputFormtarget : null"
            :height="inputType === 'image' ? inputHeight : null"
            :list="
                ['hidden', 'password', 'checkbox', 'radio', 'image', 'submit'].includes(inputType)
                    ? null
                    : inputListId
            "
            :max="
                ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'].includes(
                    inputType
                )
                    ? inputMax
                    : null
            "
            :maxlength="
                ['text', 'search', 'url', 'tel', 'email', 'password'].includes(inputType)
                    ? inputMaxlength
                    : null
            "
            :min="
                ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'].includes(
                    inputType
                )
                    ? inputMin
                    : null
            "
            :minlength="
                ['text', 'search', 'url', 'tel', 'email', 'password'].includes(inputType)
                    ? inputMinlength
                    : null
            "
            :multiple="['email', 'file'].includes(inputType) ? inputMultiple : null"
            :pattern="
                ['text', 'search', 'url', 'tel', 'email', 'password'].includes(inputType)
                    ? inputPattern
                    : null
            "
            :placeholder="
                ['text', 'search', 'url', 'tel', 'email', 'password', 'number'].includes(inputType)
                    ? inputPlaceholder
                    : null
            "
            :popovertarget="inputType === 'button' ? inputPopovertarget : null"
            :popovertargetaction="inputType === 'button' ? inputPopovertargetaction : null"
            :readonly="
                ['hidden', 'range', 'color', 'checkbox', 'radio', 'button', 'image'].includes(
                    inputType
                )
                    ? null
                    : inputReadonly
            "
            :required="
                ['hidden', 'range', 'color', 'button', 'image'].includes(inputType)
                    ? null
                    : inputRequired
            "
            :size="
                ['text', 'search', 'url', 'tel', 'email', 'password'].includes(inputType)
                    ? inputSize
                    : null
            "
            :src="inputType === 'image' ? inputSrc : null"
            :step="
                ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'].includes(
                    inputType
                )
                    ? inputStep
                    : null
            "
            :value="inputType === 'image' ? null : inputValue"
            :width="inputType === 'image' ? inputWidth : null"
            :aria-describedby="inputId + '-info'"
        />
    </div>
    <datalist
        v-if="
            inputListId &&
            inputListOptions &&
            !['hidden', 'password', 'checkbox', 'radio', 'image', 'submit'].includes(inputType)
        "
        :id="inputListId"
    >
        <BasicOption :optionList="inputListOptions" />
    </datalist>
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

export default defineComponent({
    name: "BasicInput",
    components: { BasicOption },
    props: {
        inputWrapperClass: {
            // custom wrapper Class.
            type: String,
            required: false,
        },
        inputClass: {
            // custom Class.
            type: String,
            required: false,
        },
        inputLabelClass: {
            // custom Class.
            type: String,
            required: false,
        },
        inputLabelInfoClass: {
            // custom Class.
            type: String,
            required: false,
        },
        inputType: {
            type: String,
            required: false,
            default: "text",
            validator(value: string) {
                return [
                    "button",
                    "checkbox",
                    "color",
                    "date",
                    "datetime-local",
                    "email",
                    "file",
                    "hidden",
                    "image",
                    "month",
                    "number",
                    "password",
                    "radio",
                    "range",
                    "reset",
                    "search",
                    "submit",
                    "tel",
                    "text",
                    "time",
                    "url",
                    "week",
                ].includes(value);
            },
        },
        inputAccept: {
            // Media capture input method in file upload controls.
            type: String,
            required: false,
        },
        inputAlt: {
            // Valid for the 'image' type only, the alt attribute provides alternative text for the image.
            type: String,
            required: false,
        },
        inputAutocomplete: {
            // ["on", "off", "given-name", "additional-name", "family-name", "email", "new-password", "current-password", "street-address", "postal-code", ...].
            type: String,
            required: false,
        },
        inputCapture: {
            // Media capture input method in file upload controls. For input 'file' type.
            type: String,
            required: false,
        },
        inputChecked: {
            // Valid for both radio and checkbox types, checked is a Boolean attribute.
            type: Boolean,
            required: false,
            default: false,
        },
        inputDirname: {
            // Name of form field to use for sending the element's directionality in form submission. For file types: [hidden, text, search, url, tel, email].
            // e.g. page.html?nameValue=inputValue&dirnameValue=ltr
            type: String,
            required: false,
        },
        inputDisabled: {
            // The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form.
            type: Boolean,
            required: false,
            default: false,
        },
        inputForm: {
            // must match the id of a <form> element with which the input is associated.
            type: String,
            required: false,
        },
        inputFormaction: {
            // URL to use for form submission, valid for the 'image' and 'submit' input types only.
            type: String,
            required: false,
        },
        inputFormenctype: {
            // Form data set encoding type to use for form submission, valid for the 'image' and 'submit' input types only.
            type: String,
            required: false,
        },
        inputFormmethod: {
            // HTTP method to use for form submission, valid for the 'image' and 'submit'.input types only.
            type: String,
            required: false,
        },
        inputFormnovalidate: {
            // Bypass form control validation for form submission, valid for the 'image' and 'submit' input types only.
            type: Boolean,
            required: false,
        },
        inputFormtarget: {
            // Browsing context for form submission, valid for the 'image' and 'submit' input types only.
            type: String,
            required: false,
        },
        inputHeight: {
            // Same as height attribute for <img>; vertical dimension.
            type: Number,
            required: false,
        },
        inputId: {
            // Unique id of the form control. Matches for attribute in <label>.
            type: String,
            required: true,
        },
        inputListId: {
            // the id of a <datalist> element. It is valid on types: text, search, url, tel, email, date, month, week, time, datetime-local, number, range, and color.
            type: String,
            required: false,
        },
        inputListOptions: {
            // Array of <option>. Option object has keys: label, value, disabled, selected.
            type: Array as PropType<Option[]>,
            required: false,
        },
        inputMax: {
            // input max value for types: [date, month, week, time, datetime-local, number and range].
            type: Number,
            required: false,
        },
        inputMaxlength: {
            // maximum string length that the user can enter into <input> [value > 0] for types: [text, search, url, tel, email, password].
            type: Number,
            required: false,
        },
        inputMin: {
            // input min value for types: [date, month, week, time, datetime-local, number and range].
            type: Number,
            required: false,
        },
        inputMinlength: {
            // minimum string length that the user can enter into <input> [value > 0] for types: text, search, url, tel, email, password.
            type: Number,
            required: false,
        },
        inputMultiple: {
            // Boolean. Whether to allow multiple values for types 'email, file'.
            type: Boolean,
            required: false,
        },
        inputName: {
            // Name of the form control. Submitted with the form as part of a name/value pair.
            type: String,
            required: true,
        },
        inputPattern: {
            // RegExp pattern the value must match to be valid. Types: 'text, search, url, tel, email, password'.
            type: String,
            required: false,
        },
        inputPlaceholder: {
            // text displayed in a form control when the control has no value.
            type: String,
            required: false,
        },
        inputPopovertarget: {
            // Designates an <input type="button"> as a control for a popover element. The value needs to match the ID of the popup content.
            type: String,
            required: false,
        },
        inputPopovertargetaction: {
            // Designates an <input type="button"> as a control for a popover element.
            type: String,
            required: false,
            default: "toggle",
            validator(value: string) {
                return ["hide", "show", "toggle"].includes(value);
            },
        },
        inputReadonly: {
            // the user can not edit the input, the element does not participate in constraint validation.
            type: Boolean,
            required: false,
            default: false,
        },
        inputRequired: {
            // The Boolean required attribute, if present, indicates that the user must specify a value for the input before the owning form can be submitted.
            type: Boolean,
            required: false,
            default: false,
        },
        inputSize: {
            // Size of the control
            type: Number,
            required: false,
        },
        inputSrc: {
            // Same as src attribute for <img>; address of image resource.
            type: String,
            required: false,
        },
        inputStep: {
            // Incremental values that are valid.
            type: [Number, String],
            required: false,
            validator(value: number | string) {
                let validValue = true;
                if (typeof value === "string") {
                    validValue = value === "any";
                }
                return validValue;
            },
        },
        inputValue: {
            // The initial value of the control.
            type: String,
            required: false,
        },
        inputWidth: {
            // Same as width attribute for <img>.
            type: Number,
            required: false,
        },
        inputLabel: {
            // text for the <label> element.
            type: String,
            required: true,
        },
        inputAdditionalInfo: {
            // text that adds additional information to the input field
            type: String,
            required: false,
        },
    },
});
</script>

<style lang="scss"></style>
