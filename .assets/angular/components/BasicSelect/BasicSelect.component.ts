import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './BasicSelect.component.html',
  styleUrl: './BasicSelect.component.scss'
})
export class BasicSelectComponent {
  @Input() selectWrapperClass: string = '';

  @Input() selectLabelClass: string = '';
  @Input({ required: true }) selectLabel!: string;

  @Input() selectClass: string = '';
  @Input({ required: true }) selectId!: string;
  @Input({ required: true }) selectName!: string;
  @Input() selectForm: string = '';
  @Input({ transform: parseOptions }) selectOptions: Option[] = [];
  @Input({ transform: parseOptionsGroup }) selectOptionsGroup: OptionsGroup[] = [];
  @Input() selectAutocomplete: string = '';
  @Input({ transform: booleanAttribute }) selectAutofocus: boolean = false;
  @Input({ transform: booleanAttribute }) selectDisabled: boolean = false;
  @Input() selectValue: string = '';
  @Input({ transform: booleanAttribute }) selectMultiple: boolean = false;
  @Input({ transform: booleanAttribute }) selectRequired: boolean = false;
  @Input({ transform: numberAttribute }) selectSize!: number;
}

interface OptionsGroup {
  label: string;
  disabled?: boolean;
  options: Option[];
}
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  selected?: boolean;
}
function parseOptions(object: string): Option[] {
  return JSON.parse(object)
}
function parseOptionsGroup(object: string): OptionsGroup[] {
  return JSON.parse(object)
}