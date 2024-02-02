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
    getClasses,
    resolveOriginPath
} from './utils.js'

import {
    VUE_FOLDER_ORIGIN,
    VUE_FOLDER_DESTINY,
    VUE_COMP_FOLDER,
    VUE_COMP_FILES,
    BASIC_TYPE_MAP,
    VUE_COMP_DEPENDENCIES_MAP,
    BASIC_INPUT_MAP
} from './constants.js'

/**
 * createVueForm() is an async Public fn
 * creates and writes the Vue form component file, and copies all basic elements components needed.
 * @param {Array<customShape>} customJson 
 * @param {string} fileName 
 * @param {Array<customClass>} customCss 
 */
export const createVueForm = async (customJson: Array<customShape>, fileName: string, customCss: Array<customClass>) => {
    const basicComponents = new Set<string>()
    const fileComponent: string = `Form${toPascalCase(fileName)}`
    // Create folders for shape form component
    await createFolder(VUE_FOLDER_DESTINY)
    // create shape form component
    let formMarkup:string = ''
    formMarkup += getTemplateMarkup(customJson, fileName, customCss, basicComponents)
    formMarkup += getScriptMarkup(fileComponent, basicComponents)
    // write shape form component
    await fs.promises.writeFile(`${VUE_FOLDER_DESTINY}/${fileComponent}.vue`, formMarkup)
    console.log(
        '%s %s %s',
        chalk.italic(fileComponent),
        chalk.dim('component has been created in'),
        chalk.italic(VUE_FOLDER_DESTINY)
    )
    // create main folder for Basic form components
    await createFolder(`${VUE_FOLDER_DESTINY}/${VUE_COMP_FOLDER}`)
    basicComponents.forEach( component => {
        // check Basic components dependencies
        if (VUE_COMP_DEPENDENCIES_MAP.has(component)) {
            const dependencyComponent: string = VUE_COMP_DEPENDENCIES_MAP.get(component)!
            basicComponents.add(dependencyComponent)
        }
        VUE_COMP_FILES.forEach(async (fileType: string) => {
            // copy and paste for a Basic form component
            const vueFolderOrigin = resolveOriginPath(VUE_FOLDER_ORIGIN)
            await fs.copyFile(
                `${vueFolderOrigin}/${VUE_COMP_FOLDER}/${component}${fileType}`,
                `${VUE_FOLDER_DESTINY}/${VUE_COMP_FOLDER}/${component}${fileType}`,
                (err) => { if (err) throw err }
            );
            console.log(
                '%s %s %s',
                chalk.italic(component),
                chalk.dim('component has been copied in'),
                chalk.italic(VUE_FOLDER_DESTINY+'/'+VUE_COMP_FOLDER)
            )
        })
    })
}

/**
 * getTemplateMarkup() is a Private fn
 * returns the <template> code to include on the vue file.
 * @param {Array<customShape>} customJson contains shape data
 * @param {string} fileName of the vue form
 * @param {Array<customClass>} customCss contains custom CSS class data
 * @param {Set<string>} basicComponents list of vue components used on the form
 * @returns {string} Returns Vue HTML markup
 */
function getTemplateMarkup(customJson: Array<customShape>, fileName: string, customCss: Array<customClass>, basicComponents: Set<string>): string {
    let templateMarkup = `
<template>
<form id="${fileName}" class="${getClasses('form', customCss)}">`

    customJson.forEach((block, index) => {
        if (block.title) {
            templateMarkup += `
    <h2>${block.title}</h2>`
        }
        if (block.elements && block.elements.length) {
            block.elements.forEach((element: element) => {
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
</form>
</template>`

    return templateMarkup
}

/**
 * getBasicInputMarkup() is a Private fn
 * returns the <template> code for an <input> HTML element
 * @param {object<element>} element contains html form element shape data
 * @param {string} fileName of the vue form
 * @param {Array<customClass>} customCss contains custom CSS class data
 * @returns {string} Returns Vue BasicInput HTML markup
 */
function getBasicInputMarkup(element: element, fileName: string, customCss: Array<customClass>): string {
    const inputId: string = BASIC_INPUT_MAP.get('inputId')!
    let BasicInputMarkup = `
    <BasicInput
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
        :inputRequired="true"`
    }
    if (element.list) {
        BasicInputMarkup += `
        inputListId="list-${element.id}"
        :inputListOptions='${JSON.stringify(element.list)}'`
    }
    if (element.pattern) {
        BasicInputMarkup += `
        inputPattern="${element.pattern}"`
    }
    BasicInputMarkup += `
    />`

    return BasicInputMarkup
}

/**
 * getScriptMarkup() is a Private fn
 * returns the <script> code to include after the <template> on the vue file.
 * @param {string} fileName of the vue form
 * @param {Set<string>} basicComponents set of components to be imported
 * @returns {string} Return Vue TypeScript code
 */
function getScriptMarkup(fileName: string, basicComponents: Set<string>): string {
    let scriptMarkup = `
<script lang="ts">
import { defineComponent } from "vue"
`
    basicComponents.forEach( component => {
        scriptMarkup += `
import ${component} from "./${VUE_COMP_FOLDER}/${component}.vue"`
    })
    scriptMarkup += `
export default defineComponent({
    name: "${fileName}",
    components: {`
    basicComponents.forEach( component => {
        scriptMarkup += `
        ${component},`
    })
    scriptMarkup += `
    },
})
</script>`

    return scriptMarkup
}
