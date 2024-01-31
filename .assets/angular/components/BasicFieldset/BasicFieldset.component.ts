import { Component, Input, booleanAttribute, } from '@angular/core';
import { BasicInputComponent } from '../BasicInput/BasicInput.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-fieldset',
  imports: [FormsModule, CommonModule, BasicInputComponent],
  templateUrl: './BasicFieldset.component.html',
  styleUrl: './BasicFieldset.component.scss'
})
export class BasicFieldsetComponent {
  @Input() fieldsetClass: string = '';
  @Input() fieldsetLegendClass: string = '';
  @Input() fieldsetLegend: string = '';
  @Input({ transform: booleanAttribute }) fieldsetDisabled: boolean = false;
  @Input() fieldsetForm: string = '';
  @Input() fieldsetName: string = '';
  @Input() fieldsetType: string = 'radio';

  @Input({ transform: parseIt }) fieldsetInputs: InputObj[] = [];
}

interface InputObj {
  label: string;
  value: string;
  id?: string;
  disabled?: boolean;
  checked?: boolean;
  required?: boolean;
}

function parseIt(object: string): InputObj[] {
  return JSON.parse(object)
}
