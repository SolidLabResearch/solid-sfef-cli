import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-basic-button',
  imports: [FormsModule, CommonModule],
  templateUrl: './BasicButton.component.html',
  styleUrl: './BasicButton.component.scss'
})
export class BasicButtonComponent {
    @Input() buttonClass: string = '';
    @Input({ required: true }) buttonId!: string;
    @Input({ required: true }) buttonName!: string;
    @Input({ transform: booleanAttribute }) buttonAutofocus: boolean = false;
    @Input({ transform: booleanAttribute }) buttonDisabled: boolean = false;
    @Input() buttonForm: string = '';
    @Input() buttonFormaction: string = '';
    @Input() buttonFormenctype: string = '';
    @Input() buttonFormmethod: string = '';
    @Input() buttonFormnovalidate: string = '';
    @Input() buttonFormtarget: string = '';
    @Input() buttonPopovertarget: string = '';
    @Input() buttonPopovertargetaction: string = '';
    @Input() buttonType: string = 'button';
    @Input() buttonValue: string = '';
    @Input() buttonInnerHTML: string = '';
}
