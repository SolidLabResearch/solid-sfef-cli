import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-basic-input',
    imports: [FormsModule, CommonModule],
    templateUrl: './BasicInput.component.html',
    styleUrl: './BasicInput.component.scss',
})
export class BasicInputComponent {
    @Input() inputWrapperClass: string = '';

    @Input() inputLabelClass: string = '';
    @Input({ required: true }) inputLabel!: string;
    @Input() inputLabelInfoClass: string = '';
    @Input() inputAdditionalInfo: string = '';

    @Input() inputClass: string = '';
    @Input() inputType: string = 'text';
    @Input({ required: true }) inputId!: string;
    @Input() inputForm: string = '';

    @Input() inputAccept: string = '';
    @Input() inputAlt: string = '';
    @Input() inputAutocomplete: string = '';
    @Input() inputCapture: string = '';
    @Input({ transform: booleanAttribute }) inputChecked: boolean = false;
    @Input() inputDirname: string = '';
    @Input({ transform: booleanAttribute }) inputDisabled: boolean = false;
    @Input() inputFormaction: string = '';
    @Input() inputFormenctype: string = '';
    @Input() inputFormmethod: string = '';
    @Input() inputFormnovalidate: string = '';
    @Input() inputFormtarget: string = '';
    @Input({ transform: numberAttribute }) inputHeight!: number;
    @Input() inputListId:string = '';
    @Input({ transform: parseIt }) inputListOptions: Option[] = [];
    @Input({ transform: numberAttribute }) inputMax!: number;
    @Input({ transform: numberAttribute }) inputMaxlength!: number;
    @Input({ transform: numberAttribute }) inputMin!: number;
    @Input({ transform: numberAttribute }) inputMinlength!: number;
    @Input({ transform: booleanAttribute }) inputMultiple: boolean = false;
    @Input({ required: true }) inputName!: string;
    @Input() inputPattern: string = '';
    @Input() inputPlaceholder: string = '';
    @Input() inputPopovertarget: string = '';
    @Input() inputPopovertargetaction: string = '';
    @Input({ transform: booleanAttribute }) inputReadonly: boolean = false;
    @Input({ transform: booleanAttribute }) inputRequired: boolean = false;
    @Input({ transform: numberAttribute }) inputSize!: number;
    @Input() inputSrc: string = '';
    @Input() inputStep: string = '';
    @Input() inputValue: string = '';
    @Input({ transform: numberAttribute }) inputWidth!: number;

    get inputAriaDescribedBy(): string {
        return this.inputId + '-info';
    }
}

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    selected?: boolean;
}
function parseIt(object: string): Option[] {
    return JSON.parse(object)
}