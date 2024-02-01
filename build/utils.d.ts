#!/usr/bin/env node
import { element, customClass } from './types.js';
/**
 * getBasicInputType() is a Public fn
 * Returns the form element type
 * @param {object} element custom object used on eval()
 * @returns {string} expected type
 */
export declare function getBasicInputType(element: element): string;
/**
 * createClasses() is a Public fn
 * Ask custom classes for different elements and Writes it on a file
 */
export declare function createClasses(): Promise<void>;
/**
 * getClasses() is a Public fn
 * e.g. for 'label' element get custom classes 'form__label--floating form_label--error'
 * @param {string} targetElement for which we require the custom classes
 * @param {Array<customClass>} customCSS contains the mapping between elements and classes
 * @returns {string} Returns corresponding custom classes
 */
export declare function getClasses(targetElement: string, customCSS: Array<customClass>): string;
/**
 * readClasses() is Public fn
 * Reads the custom Classes file data
 * @returns {Promise<customClass[]>} array of element classes
 */
export declare const readClasses: () => Promise<customClass[]>;
/**
 * createFolder() is Public fn
 * Check if folder exists, and creates it if it doesn't
 * @param {string} folder name
 */
export declare const createFolder: (folder: string) => Promise<void>;
/**
 * resolveOriginPath() is Public fn
 * takes a relative path (related to the solid-sfef-cli package)
 * and returns its absolute path
 * e.g. '../.assets/shacl' > '/usr/local/lib/node_modules/SolidLabResearch/solid-sfef-cli/.assets/shacl'
 * @param {string} relativePath is a cli package relative path
 * @returns {string} an absolute path
 */
export declare const resolveOriginPath: (relativePath: string) => string;
/**
 * toKebabCase() is Public fn
 * e.g. from "abcDefGhi" to "abc-def-ghi"
 * @param {string} word to convert
 * @returns {string} in KebabCase
 */
export declare const toKebabCase: (word: string) => string;
/**
 * unCamelCase() is Public fn
 * e.g. from "abcDefGhi" to "Abc Def Ghi"
 * @param {string} word to convert
 * @returns {string} in phrase way (space between words)
 */
export declare const unCamelCase: (word: string) => string;
/**
 * toPascalCase() is Public fn
 * e.g. from "abc-DEF gHI" to "AbcDefGhi"
 * @param {string} sentence to convert
 * @returns {string} in PascalCase
 */
export declare const toPascalCase: (sentence: string) => string;
