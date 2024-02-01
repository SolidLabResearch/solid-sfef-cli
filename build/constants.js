#!/usr/bin/env node
export const PKG = '../package.json';
export const FRAMEWORKS = ['vue', 'angular'];
export const CUSTOM_CLASSES_FILE = './src/form-custom-classes.json';
export const SHAPES_FOLDER = '../.assets/shacl';
export const SHAPE_EXT = '.ttl';
export const FORM_CUSTOM_ELEMENTS = [
    'form',
    'input-wrapper',
    'input-label',
    'input-additional-info',
    'input-element'
];
export const VUE_FOLDER_ORIGIN = '../.assets/vue';
export const VUE_FOLDER_DESTINY = 'src/vue';
export const VUE_COMP_FOLDER = 'components';
export const VUE_COMP_FILES = ['.vue'];
export const ANGULAR_FOLDER_ORIGIN = '../.assets/angular';
export const ANGULAR_FOLDER_DESTINY = 'src/app';
export const ANGULAR_COMP_FOLDER = 'components';
export const ANGULAR_COMP_FILES = ['.component.html', '.component.scss', '.component.ts'];
/**
 * BASIC_TYPE_MAP maps
 * the type (previously mapped from the sh:datatype in sh:property in the JSONLD)
 * with the FE Framework component Basic element and type.
 *
 * e.g. [m].elements.[n].type: 'lang String' >> BasicInput component with the type='text'
 * ---
 * IN PROGRESS...
 * In january/2024 only existing maps are with BasicInput,
 * once more Shapes scenarios are in consideration,
 * new mappings will be required.
 */
export const BASIC_TYPE_MAP = new Map([
    ['', ['BasicInput', 'text']],
    ['email', ['BasicInput', 'email']],
    ['string', ['BasicInput', 'text']],
    ['lang String', ['BasicInput', 'text']],
    ['boolean', ['BasicInput', 'checkbox']],
    ['integer', ['BasicInput', 'number']],
    ['decimal', ['BasicInput', 'number']],
    ['float', ['BasicInput', 'number']],
    ['double', ['BasicInput', 'number']],
    ['duration', ['', '']],
    ['dateTime', ['BasicInput', 'datetime-local']],
    ['time', ['BasicInput', 'time']],
    ['date', ['BasicInput', 'date']],
    ['gYearMonth', ['BasicInput', 'month']],
    ['gYear', ['', '']],
    ['gMonthDay', ['', '']],
    ['gDay', ['', '']],
    ['gMonth', ['', '']],
    ['hexBinary', ['', '']],
    ['base64Binary', ['', '']],
    ['anyURI', ['BasicInput', 'url']],
    ['QName', ['', '']],
    ['NOTATION', ['', '']],
    ['toBeDefined', ['BasicButton', '']],
    ['toBeDefined', ['BasicFieldSet', '']],
    ['toBeDefined', ['BasicOption', '']],
    ['toBeDefined', ['BasicSelect', '']],
    ['toBeDefined', ['BasicTextArea', '']]
]);
/**
 * VUE_COMP_DEPENDENCIES_MAP maps
 * the inter-Components dependecies.
 *
 * e.g. BasicInput requires to import BasicOption
 */
export const VUE_COMP_DEPENDENCIES_MAP = new Map([
    ['BasicInput', 'BasicOption'],
    ['BasicSelect', 'BasicOption'],
    ['BasicFieldset', 'BasicInput'],
]);
/**
 * ANGULAR_COMP_DEPENDENCIES_MAP maps
 * the inter-Components dependecies.
 *
 * e.g. BasicInput requires to import BasicOption
 */
export const ANGULAR_COMP_DEPENDENCIES_MAP = new Map([
    ['BasicFieldset', 'BasicInput'],
]);
/**
 * BASIC_INPUT_MAP maps
 * the form elements attributes (in the framework scenario)
 * with the custom JSON data shape
 */
export const BASIC_INPUT_MAP = new Map([
    ['inputWrapperClass', ''],
    ['inputId', 'element.id'],
    ['inputLabelClass', ''],
    ['inputLabel', ''],
    ['inputAdditionalInfo', ''],
    ['inputLabelInfoClass', ''],
    ['inputClass', ''],
    ['inputType', 'element.type'],
    ['inputName', 'element.id'],
    ['inputAccept', ''],
    ['inputAlt', ''],
    ['inputCapture', ''],
    ['inputChecked', ''],
    ['inputDirname', ''],
    ['inputDisabled', ''],
    ['inputForm', 'fileName'],
    ['inputFormaction', ''],
    ['inputFormenctype', ''],
    ['inputFormmethod', ''],
    ['inputFormnovalidate', ''],
    ['inputFormtarget', ''],
    ['inputHeight', ''],
    ['inputListId', ''],
    ['inputListOptions', ''],
    ['inputMax', ''],
    ['inputMaxlength', ''],
    ['inputMin', ''],
    ['inputMinlength', ''],
    ['inputMultiple', ''],
    ['inputPattern', 'element.pattern'],
    ['inputPlaceholder', ''],
    ['inputPopovertarget', ''],
    ['inputPopovertargetaction', ''],
    ['inputReadonly', ''],
    ['inputRequired', ''],
    ['inputSize', ''],
    ['inputSrc', ''],
    ['inputStep', ''],
    ['inputValue', ''],
    ['inputWidth', ''],
]);
//# sourceMappingURL=constants.js.map