<template>
    <div class="basic-text-area" :class="textAreaWrapperClass">
        <label :for="textAreaName">{{ textAreaLabel }}</label>
        <textarea
            :class="textAreaClass"
            :id="textAreaName"
            :name="textAreaName"
            :autocomplete="textAreaAutocomplete"
            :autocorrect="textAreaAutocorrect"
            :autofocus="textAreaAutofocus"
            :cols="textAreaCols"
            :dirname="textAreaDirname"
            :disabled="textAreaDisabled"
            :form="textAreaForm"
            :maxlength="textAreaMaxlength"
            :minlength="textAreaMinlength"
            :placeholder="textAreaPlaceholder"
            :readonly="textAreaReadonly"
            :required="textAreaRequired"
            :rows="textAreaRows"
            :spellcheck="textAreaSpellcheck"
            :value="textAreaValue"
            :wrap="textAreaWrap"
        >
        </textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BasicTextArea",
    props: {
        textAreaWrapperClass: {
            // custom wrapper Class.
            type: String,
            required: false,
        },
        textAreaClass: {
            // custom Class.
            type: String,
            required: false,
        },
        textAreaAutocomplete: {
            // ["on", "off", "given-name", "additional-name", "family-name", "email", "new-password", "current-password", "street-address", "postal-code", ...].
            type: String,
            required: false,
        },
        textAreaAutocorrect: {
            // activate automatic spelling correction and processing of text substitutions.
            type: String,
            required: false,
            validator(value: string) {
                return ["on", "off"].includes(value);
            },
        },
        textAreaAutofocus: {
            // Determine if have focus when the page loads.
            type: Boolean,
            required: false,
        },
        textAreaCols: {
            // The visible width of the text control, in average character widths.
            type: Number,
            required: false,
        },
        textAreaDirname: {
            // Name of form field to use for sending the element's directionality in form submission. For file types: [hidden, text, search, url, tel, email].
            // e.g. page.html?nameValue=inputValue&dirnameValue=ltr
            type: String,
            required: false,
        },
        textAreaDisabled: {
            // The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form.
            type: Boolean,
            required: false,
            default: false,
        },
        textAreaForm: {
            // must match the id of a <form> element with which the input is associated.
            type: String,
            required: false,
        },
        textAreaMaxlength: {
            // maximum string length that the user can enter into <textarea> [value > 0].
            type: Number,
            required: false,
        },
        textAreaMinlength: {
            // minimum string length that the user can enter into <textarea> [value > 0].
            type: Number,
            required: false,
        },
        textAreaName: {
            // Name of the form control. Submitted with the form as part of a name/value pair.
            type: String,
            required: true,
        },
        textAreaPlaceholder: {
            // text displayed in a form control when the control has no value.
            type: String,
            required: false,
        },
        textAreaReadonly: {
            // the user can not edit the input, the element does not participate in constraint validation.
            type: Boolean,
            required: false,
            default: false,
        },
        textAreaRequired: {
            // The Boolean required attribute, if present, indicates that the user must specify a value for the input before the owning form can be submitted.
            type: Boolean,
            required: false,
            default: false,
        },
        textAreaRows: {
            // The number of visible text lines for the control.
            type: Number,
            required: false,
        },
        textAreaSpellcheck: {
            // Specifies whether the <textarea> is subject to spell checking by the underlying browser/OS.
            type: String,
            required: false,
            validator(value: string) {
                return ["true", "default", "false"].includes(value);
            },
        },
        textAreaValue: {
            // The initial value of the control.
            type: String,
            required: false,
        },
        textAreaWrap: {
            // Indicates how the control should wrap the value for form submission.
            type: String,
            required: false,
            validator(value: string) {
                return ["hard", "soft", "off"].includes(value);
            },
        },
        textAreaLabel: {
            // text for the <label> element.
            type: String,
            required: true,
        },
    },
});
</script>
