#!/usr/bin/env node
import fs from 'node:fs'
import chalk from 'chalk'

import {
    element,
    customShape,
    customClass
} from './types.js'

import {
    getBasicInputType,
    createFolder,
    toPascalCase,
    toKebabCase,
    getClasses,
    resolveOriginPath
} from './utils.js'

import {
    ANGULAR_FOLDER_ORIGIN,
    ANGULAR_FOLDER_DESTINY,
    ANGULAR_COMP_FOLDER,
    ANGULAR_COMP_FILES,
    BASIC_TYPE_MAP,
    ANGULAR_COMP_DEPENDENCIES_MAP,
    BASIC_INPUT_MAP
} from './constants.js'

/**
 * createVueForm() is an async Public fn
 * creates and writes the Angular form component files, and copies all basic elements components needed.
 * @param {Array<customShape>} customJson 
 * @param {string} fileName 
 * @param {Array<customClass>} customCss 
 */
export const createAngularForm = async (customJson: Array<customShape>, fileName: string, customCss: Array<customClass>) => {
    const basicComponents = new Set<string>()
    const fileComponent: string = `Form${toPascalCase(fileName)}`
    // Create folders for shape form component
    await createFolder(`${ANGULAR_FOLDER_DESTINY}`)
    await createFolder(`${ANGULAR_FOLDER_DESTINY}/${fileComponent}`)
    // create & write HTML shape form component
    const formHTML:string = getTemplateMarkup(customJson, fileName, customCss, basicComponents)
    await fs.promises.writeFile(`${ANGULAR_FOLDER_DESTINY}/${fileComponent}/${fileComponent}${ANGULAR_COMP_FILES[0]}`, formHTML)
    // create & write TS shape form component
    const formTS:string = getScriptMarkup(fileComponent, basicComponents)
    await fs.promises.writeFile(`${ANGULAR_FOLDER_DESTINY}/${fileComponent}/${fileComponent}${ANGULAR_COMP_FILES[2]}`, formTS)
    console.log(
        '%s %s %s',
        chalk.italic(fileComponent),
        chalk.dim('component has been created in'),
        chalk.italic(ANGULAR_FOLDER_DESTINY)
    )
    // create main folder for Basic form components
    await createFolder(`${ANGULAR_FOLDER_DESTINY}/${ANGULAR_COMP_FOLDER}`)
    basicComponents.forEach( async (component: string) => {
        // check Basic components dependencies
        if (ANGULAR_COMP_DEPENDENCIES_MAP.has(component)) {
            const dependencyComponent: string = ANGULAR_COMP_DEPENDENCIES_MAP.get(component)!
            basicComponents.add(dependencyComponent)
        }
        // create folder for a Basic form component
        await createFolder(`${ANGULAR_FOLDER_DESTINY}/${ANGULAR_COMP_FOLDER}/${component}`);
        ANGULAR_COMP_FILES.forEach(async (fileType: string) => {
            // copy and paste for a Basic form component
            const angularFolderOrigin = resolveOriginPath(ANGULAR_FOLDER_ORIGIN)
            await fs.copyFile(
                `${angularFolderOrigin}/${ANGULAR_COMP_FOLDER}/${component}/${component}${fileType}`,
                `${ANGULAR_FOLDER_DESTINY}/${ANGULAR_COMP_FOLDER}/${component}/${component}${fileType}`,
                (err) => { if (err) throw err }
            )
        })
        console.log(
            '%s %s %s',
            chalk.italic(component),
            chalk.dim('component has been copied in'),
            chalk.italic(ANGULAR_FOLDER_DESTINY+'/'+ANGULAR_COMP_FOLDER)
        )
    })
}

/**
 * getTemplateMarkup() is a Private fn
 * returns the markup code to include on the html file.
 * @param {Array<customShape>} customJson contains shape data
 * @param {string} fileName of the vue form
 * @param {Array<customClass>} customCss contains custom CSS class data
 * @param {Set<string>} basicComponents list of vue components used on the form
 * @returns {string} Returns Angular HTML markup
 */
function getTemplateMarkup(customJson: Array<customShape>, fileName: string, customCss: Array<customClass>, basicComponents: Set<string>) {
    let templateMarkup = `
<form id="${fileName}" class="${getClasses('form', customCss)}">`

    customJson.forEach((block, index) => {
        if (block.title) {
            templateMarkup += `
    <h2>${block.title}</h2>`
        }
        if (block.elements && block.elements.length) {
            block.elements.forEach((element) => {
                const basicComponent: string = BASIC_TYPE_MAP.get(element.type)![0]
                if (element.type) basicComponents.add(basicComponent)

                switch (basicComponent) {
                    case 'BasicButton':
                        // to do if needed
                        break
                    case 'BasicFieldSet':
                        // to do if needed
                        break
                    case 'BasicOption':
                        // to do if needed
                        break
                    case 'BasicSelect':
                        // to do if needed
                        break
                    case 'BasicTextArea':
                        // to do if needed
                        break
                    default:
                      templateMarkup += getBasicInputMarkup(element, fileName, customCss)
                  }
            })
        }
    });
    templateMarkup += `
</form>`

    return templateMarkup
}

/**
 * getBasicInputMarkup() is a Private fn
 * returns the <template> code for an <input> HTML element
 * @param {object<element>} element contains html form element shape data
 * @param {string} fileName of the vue form
 * @param {Array<customClass>} customCss contains custom CSS class data
 * @returns {string} Returns Angular BasicInput HTML markup
 */
function getBasicInputMarkup(element: element, fileName: string, customCss: Array<customClass>): string {
    const inputId: string = BASIC_INPUT_MAP.get('inputId')!
    let BasicInputMarkup = `
    <app-basic-input
        inputType="${getBasicInputType(element)}"
        inputId="${eval(inputId)}"
        inputName="${element.id}"
        inputForm="${fileName}"
        inputWrapperClass="${getClasses('input-wrapper', customCss)}"
        inputClass="${getClasses('input-element', customCss)}"`
    if (element.name) {
        BasicInputMarkup += `
        inputLabel="${element.name}"
        inputLabelClass="input-label ${getClasses('input-label', customCss)}"`
    }
    if (element.description) {
        BasicInputMarkup += `
        inputAdditionalInfo="${element.description}"
        inputLabelInfoClass="${getClasses('input-additional-info', customCss)}"`
    }
    if (element.min) {
        BasicInputMarkup += `
        inputRequired="true"`
    }
    if (element.list) {
        BasicInputMarkup += `
        inputListId="list-${element.id}"
        inputListOptions='${JSON.stringify(element.list)}'`
    }
    if (element.pattern) {
        BasicInputMarkup += `
        inputPattern="${element.pattern}"`
    }
    BasicInputMarkup += `
    ></app-basic-input>`

    return BasicInputMarkup
}

/**
 * getScriptMarkup() is a Private fn
 * returns the TypeScript code to include Angular .ts file.
 * @param {string} fileName of the angular form
 * @param {Set<string>} basicComponents set of components to be imported
 * @returns {string} Return Angular TypeScript code
 */
function getScriptMarkup(fileName: string, basicComponents: Set<string>): string {
    let scriptMarkup = `
import { Component, ViewEncapsulation } from '@angular/core';
`
    basicComponents.forEach( component => {
        scriptMarkup += `
import { ${component}Component } from "../${ANGULAR_COMP_FOLDER}/${component}/${component}.component"`
    })
    scriptMarkup += `

@Component({
    selector: "app-${toKebabCase(fileName)}",
    standalone: true,
    imports: [`
    basicComponents.forEach( component => {
        scriptMarkup += `
        ${component}Component,`
    })
    scriptMarkup += `
    ],
    templateUrl: './${fileName}.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ${fileName} {
}
`

    return scriptMarkup
}
