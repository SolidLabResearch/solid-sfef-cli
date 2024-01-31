<template>
    <button
        :class="buttonClass"
        :id="buttonName"
        :name="buttonName"
        :autofocus="buttonAutofocus"
        :disabled="buttonDisabled"
        :form="buttonForm"
        :formaction="buttonFormaction"
        :formenctype="buttonFormenctype"
        :formmethod="buttonFormmethod"
        :formnovalidate="buttonFormnovalidate"
        :formtarget="buttonFormtarget"
        :popovertarget="buttonPopovertarget"
        :popovertargetaction="buttonPopovertargetaction"
        :type="buttonType"
        :value="buttonValue"
        v-html="buttonInnerHTML"
    ></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BasicButton",
    props: {
        buttonClass: {
            // custom Class.
            type: String,
            required: false,
        },
        buttonAutofocus: {
            // Determine if have focus when the page loads.
            type: Boolean,
            required: false,
        },
        buttonDisabled: {
            // The Boolean disabled attribute, when present, makes the element not mutable, focusable, or clickable within the form.
            type: Boolean,
            required: false,
            default: false,
        },
        buttonForm: {
            // must match the id of a <form> element with which the input is associated.
            type: String,
            required: false,
        },
        buttonFormaction: {
            // The URL that processes the information submitted by the button. Overrides the action attribute of the button's form owner. Does nothing if there is no form owner.
            type: String,
            required: false,
        },
        buttonFormenctype: {
            // If the button is a submit button, specifies how to encode the form data that is submitted.
            type: String,
            required: false,
        },
        buttonFormmethod: {
            // HTTP method to use for form submission.
            type: String,
            required: false,
        },
        buttonFormnovalidate: {
            // Bypass form control validation for form submission.
            type: Boolean,
            required: false,
        },
        buttonFormtarget: {
            // Browsing context for form submission.
            type: String,
            required: false,
        },
        buttonName: {
            // Name of the form control. Submitted with the form as part of a name/value pair.
            type: String,
            required: true,
        },
        buttonPopovertarget: {
            // Designates <button> as a control for a popover element. The value needs to match the ID of the popup content.
            type: String,
            required: false,
        },
        buttonPopovertargetaction: {
            // Designates <button> as a control for a popover element.
            type: String,
            required: false,
            default: "toggle",
            validator(value: string) {
                return ["hide", "show", "toggle"].includes(value);
            },
        },
        buttonType: {
            // The default behavior of the button.
            type: String,
            required: false,
            validator(value: string) {
                return ["submit", "reset", "button"].includes(value);
            },
        },
        buttonValue: {
            // Defines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button.
            type: String,
            required: false,
        },
        buttonInnerHTML: {
            // Text (HTML) to be displayed as the button's caption.
            type: String,
            required: false,
        },
    },
});
</script>
