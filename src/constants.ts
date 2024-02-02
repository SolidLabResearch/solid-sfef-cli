#!/usr/bin/env node
export const PKG: string = '../package.json'
export const FRAMEWORKS: string[] = ['vue', 'angular']
export const CUSTOM_CLASSES_FILE: string = './src/form-custom-classes.json'
export const SHAPES_FOLDER: string = '../.assets/shacl'
export const SHAPE_EXT: string = '.ttl'
export const FORM_CUSTOM_ELEMENTS: string[] = [
    'form',
    'input-wrapper',
    'input-label',
    'input-additional-info',
    'input-element'
]

export const VUE_FOLDER_ORIGIN: string = '../.assets/vue'
export const VUE_FOLDER_DESTINY: string = 'src/vue'
export const VUE_COMP_FOLDER: string = 'components'
export const VUE_COMP_FILES: string[] = ['.vue']

export const ANGULAR_FOLDER_ORIGIN: string = '../.assets/angular'
export const ANGULAR_FOLDER_DESTINY: string = 'src/app'
export const ANGULAR_COMP_FOLDER: string = 'components'
export const ANGULAR_COMP_FILES: string[] = ['.component.html', '.component.scss', '.component.ts']

/**
 * BASIC_TYPE_MAP maps 
 * the type (previously mapped from the sh:datatype in sh:property in the JSONLD)
 * with the FE Framework component Basic element and type.
 * 
 * e.g. [m].elements.[n].type: 'lang String' >> BasicInput component with the type='text'
 * ---
 * IN PROGRESS...
 * In january/2024 only existing maps are with BasicInput,
 * once more Shapes scenarios are implemented,
 * new mappings will be required.
 */
export const BASIC_TYPE_MAP = new Map<string, [string, string]>([
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
    ['base64Binary',['', '']],
    ['anyURI', ['BasicInput', 'url']],
    ['QName', ['', '']],
    ['NOTATION', ['', '']],
    ['toBeDefined01', ['BasicButton', '']],
    ['toBeDefined02', ['BasicFieldSet', '']],
    ['toBeDefined03', ['BasicOption', '']],
    ['toBeDefined04', ['BasicSelect', '']],
    ['toBeDefined05', ['BasicTextArea', '']]
])

/**
 * VUE_COMP_DEPENDENCIES_MAP maps 
 * the inter-Components dependecies.
 * 
 * e.g. BasicInput requires to import BasicOption
 */
export const VUE_COMP_DEPENDENCIES_MAP = new Map<string, string>([
    ['BasicInput', 'BasicOption'],
    ['BasicSelect', 'BasicOption'],
    ['BasicFieldset', 'BasicInput'],
])
/**
 * ANGULAR_COMP_DEPENDENCIES_MAP maps 
 * the inter-Components dependecies.
 * 
 * e.g. BasicInput requires to import BasicOption
 */
export const ANGULAR_COMP_DEPENDENCIES_MAP = new Map<string, string>([
    ['BasicFieldset', 'BasicInput'],
])

/**
 * BASIC_INPUT_MAP maps
 * the form elements attributes (in the framework scenario)
 * with the custom JSON data shape
 */
export const BASIC_INPUT_MAP = new Map<string, string>([
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
])
