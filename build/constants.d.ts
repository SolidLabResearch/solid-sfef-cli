#!/usr/bin/env node
export declare const PKG: string;
export declare const FRAMEWORKS: string[];
export declare const CUSTOM_CLASSES_FILE: string;
export declare const SHAPES_FOLDER: string;
export declare const SHAPE_EXT: string;
export declare const FORM_CUSTOM_ELEMENTS: string[];
export declare const VUE_FOLDER_ORIGIN: string;
export declare const VUE_FOLDER_DESTINY: string;
export declare const VUE_COMP_FOLDER: string;
export declare const VUE_COMP_FILES: string[];
export declare const ANGULAR_FOLDER_ORIGIN: string;
export declare const ANGULAR_FOLDER_DESTINY: string;
export declare const ANGULAR_COMP_FOLDER: string;
export declare const ANGULAR_COMP_FILES: string[];
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
export declare const BASIC_TYPE_MAP: Map<string, [string, string]>;
/**
 * VUE_COMP_DEPENDENCIES_MAP maps
 * the inter-Components dependecies.
 *
 * e.g. BasicInput requires to import BasicOption
 */
export declare const VUE_COMP_DEPENDENCIES_MAP: Map<string, string>;
/**
 * ANGULAR_COMP_DEPENDENCIES_MAP maps
 * the inter-Components dependecies.
 *
 * e.g. BasicInput requires to import BasicOption
 */
export declare const ANGULAR_COMP_DEPENDENCIES_MAP: Map<string, string>;
/**
 * BASIC_INPUT_MAP maps
 * the form elements attributes (in the framework scenario)
 * with the custom JSON data shape
 */
export declare const BASIC_INPUT_MAP: Map<string, string>;
