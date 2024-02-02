#!/usr/bin/env node
import fs from 'node:fs'
import readline from 'readline'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

import {
    BASIC_INPUT_MAP,
    BASIC_TYPE_MAP,
    FORM_CUSTOM_ELEMENTS,
    CUSTOM_CLASSES_FILE
} from './constants.js'

import {
    element,
    customClass
} from './types.js'

/**
 * getBasicInputType() is a Public fn
 * Returns the form element type
 * @param {object} element custom object used on eval()
 * @returns {string} expected type
 */
export function getBasicInputType(element: element): string {
    const type: string = BASIC_INPUT_MAP.get('inputType')!
    const shapeType: string = eval(type)
    const componentValues: [string, string] = BASIC_TYPE_MAP.get(shapeType)!

    return componentValues[1]
}

/**
 * classQuestion() is a Private fn
 * @param {string} element 
 * @returns {Promise}
 */
function classQuestion(element: string) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(`Custom class for the ${element} element: `,
            (answer: string) => {
                rl.close();
                resolve(answer)
            }
        )
    })
}

/**
 * createClasses() is a Public fn
 * Ask custom classes for different elements and Writes it on a file 
 */
export async function createClasses() {
    const customClasses: customClass[] = []
    for (const element of FORM_CUSTOM_ELEMENTS) {
        const elementClass: any = await classQuestion(element);
        const classes: customClass = {'element': element, 'classes': elementClass.split(',')}
        customClasses.push(classes)
    }
    fs.writeFile(CUSTOM_CLASSES_FILE, JSON.stringify(customClasses), 'utf8',
        (err) => {if (err) console.error(chalk.red(err.message))}
    ) 
}

/**
 * getClasses() is a Public fn
 * e.g. for 'label' element get custom classes 'form__label--floating form_label--error'
 * @param {string} targetElement for which we require the custom classes
 * @param {Array<customClass>} customCSS contains the mapping between elements and classes
 * @returns {string} Returns corresponding custom classes
 */
export function getClasses(targetElement: string, customCSS: Array<customClass>): string {
    let classes = ''
    if (customCSS.length) {
        let elementClasses = customCSS.filter(item => item.element === targetElement)
        classes = elementClasses[0]['classes'].join(' ')
    }
    return classes
}

/**
 * readClasses() is Public fn
 * Reads the custom Classes file data
 * @returns {Promise<customClass[]>} array of element classes
 */
export const readClasses = async(): Promise<customClass[]> => {
    let customClasses: customClass[] = []
    try {
        await fs.promises.access(CUSTOM_CLASSES_FILE, fs.constants.F_OK)
    } catch (err: any) {
        console.error('no file available.\n', chalk.red(err.message))
        return customClasses
    }
    try {
        const contents = await fs.promises.readFile(CUSTOM_CLASSES_FILE, { encoding: 'utf8' })
        customClasses = JSON.parse(contents)
    } catch (err: any) {
        console.error('not able to read the file.\n', chalk.red(err.message))
    }
    return customClasses
}

/**
 * createFolder() is Public fn
 * Check if folder exists, and creates it if it doesn't
 * @param {string} folder name
 */
export const createFolder = async(folder: string) => {
    if (!fs.existsSync(folder)) {
        await fs.promises.mkdir(folder)
    }
}

/**
 * resolveOriginPath() is Public fn
 * takes a relative path (related to the solid-sfef-cli package)
 * and returns its absolute path
 * e.g. '../.assets/shacl' > '/usr/local/lib/node_modules/SolidLabResearch/solid-sfef-cli/.assets/shacl'
 * @param {string} relativePath is a cli package relative path
 * @returns {string} an absolute path
 */
export const resolveOriginPath = (relativePath: string): string => {
    // get actual js file path and directory name
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    // resolve absolute path
    return path.resolve(__dirname, relativePath)
}

/**
 * toKebabCase() is Public fn
 * e.g. from "abcDefGhi" to "abc-def-ghi"
 * @param {string} word to convert 
 * @returns {string} in KebabCase
 */
export const toKebabCase = (word: string): string => {
    const newString = word.replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, '-$1').toLowerCase();
    return newString.replace(/\s/g, '-')
}

/**
 * unCamelCase() is Public fn
 * e.g. from "abcDefGhi" to "Abc Def Ghi"
 * @param {string} word to convert
 * @returns {string} in phrase way (space between words)
 */
export const unCamelCase = (word: string): string => {
    const newString = word.replace(/((?<=[a-z\d])[A-Z]|(?<=[A-Z\d])[A-Z](?=[a-z]))/g, ' $1');
    return newString.charAt(0).toUpperCase() + newString.slice(1);
}

/**
 * toPascalCase() is Public fn
 * e.g. from "abc-DEF gHI" to "AbcDefGhi"
 * @param {string} sentence to convert
 * @returns {string} in PascalCase
 */
export const toPascalCase = (sentence: string): string => {
    const newStrinArray = sentence.split(/-|\s/g)
    newStrinArray.forEach((word, index) => newStrinArray[index] = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    return newStrinArray.join('')
}
