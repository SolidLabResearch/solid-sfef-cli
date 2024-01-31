import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-text-area',
  imports: [FormsModule, CommonModule],
  templateUrl: './BasicTextArea.component.html',
  styleUrl: './BasicTextArea.component.scss'
})
export class BasicTextAreaComponent {
    @Input() textAreaWrapperClass: string = '';

    @Input() textAreaLabelClass: string = '';
    @Input({ required: true }) textAreaLabel!: string;

    @Input() textAreaClass: string = '';
    @Input({ required: true }) textAreaId!: string;
    @Input({ required: true }) textAreaName!: string;
    @Input() textAreaAutocomplete: string = '';
    @Input() textAreaAutocorrect: string = '';
    @Input({ transform: booleanAttribute }) textAreaAutofocus: boolean = false;
    @Input({ transform: numberAttribute }) textAreaCols!: number;
    @Input() textAreaDirname: string = '';
    @Input({ transform: booleanAttribute }) textAreaDisabled: boolean = false;
    @Input() textAreaForm: string = '';
    @Input({ transform: numberAttribute }) textAreaMinlength!: number;
    @Input({ transform: numberAttribute }) textAreaMaxlength!: number;
    @Input() textAreaPlaceholder: string = '';
    @Input({ transform: booleanAttribute }) textAreaReadonly: boolean = false;
    @Input({ transform: booleanAttribute }) textAreaRequired: boolean = false;
    @Input({ transform: numberAttribute }) textAreaRows!: number;
    @Input() textAreaSpellcheck: string = '';
    @Input() textAreaValue: string = '';
    @Input() textAreaWrap: string = '';

}
