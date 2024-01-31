#!/usr/bin/env node
import fs from 'node:fs';
import path from 'path';
import ttl2json from '@frogcat/ttl2jsonld';
import { SHAPES_FOLDER, SHAPE_EXT } from './constants.js';
import { toKebabCase, unCamelCase, resolveOriginPath } from './utils.js';
let context = {};
/**
 * getListOfShapes() is an async Public fn
 * Returns the list of available shape files (.ttl)
 * @returns {Promise<string[]>} list of .ttl files
 */
export const getListOfShapes = async () => {
    const shapesAvailable = [];
    const files = await fs.promises.readdir(resolveOriginPath(SHAPES_FOLDER), { withFileTypes: true });
    for (const file of files) {
        const parseFile = path.parse(file.name);
        if (file.isFile() && parseFile.ext === SHAPE_EXT) {
            shapesAvailable.push(parseFile.name);
        }
    }
    return shapesAvailable;
};
/**
 * getShape() is an async Public fn
 * Calls readShape() first with file as a absolute path
 * and if it fails it tries a relative path
 * and returns the @graph data converted to a custom JSON using convertShape()
 * @param {string} file is the name of the shape to read
 * @returns {Promise<customShape>} custom JSON shape
 */
export const getShape = async (file) => {
    let graph = [];
    const shapesFolder = resolveOriginPath(SHAPES_FOLDER);
    const relativeFile = `${shapesFolder}/${file}${SHAPE_EXT}`;
    const files = [file, relativeFile];
    for (const filePath of files) {
        graph = await readShape(filePath);
        if (graph !== null)
            break;
    }
    if (graph === null) {
        return false;
    }
    return convertShape(graph);
};
/**
 * readShape() is an async Private fn
 * Reads the .ttl file and converts it to JSONLD
 * and ensures @graph Array type
 * and sets @context on global level
 * and finally returns @graph
 * @param {string} file expect a .ttl file path
 * @returns {object[]} graph data from JSONLD
 *
 * examples of valid 'file' values:
 * - 'adresregister-SHACL'
 *    > relative path expected to be in '/Users/myname/node_modules/SolidLabResearch/solid-sfef-cli/.assets/shacl/'
 * - '/Users/myname/Documents/GIT/myProject/.shapes/my-project-shape.ttl'
 *    > absolute path
 */
const readShape = async (file) => {
    let graph = [];
    try {
        const ttlShape = await fs.promises.readFile(file, { encoding: 'utf8' });
        const jsonLdShape = ttl2json.parse(ttlShape);
        context = jsonLdShape['@context'];
        if ('@graph' in jsonLdShape) {
            graph = jsonLdShape['@graph'];
        }
        else {
            const { '@context': {}, ...singleGraph } = jsonLdShape;
            graph = [singleGraph];
        }
    }
    catch (err) {
        return null;
    }
    return graph;
};
/**
 * convertShape() is a Private fn
 * Returns a custom JSON from given JsonLD shape
 * ready to be used to write FE framework markup
 * @param {Array<jsonLDGraph>} graph JSONLD graph data
 * @returns {Array<customShape>} custom JSON
 */
const convertShape = (shapes) => {
    let customShapes = [];
    shapes.forEach((shape, index) => {
        let customShape = { title: "", elements: [] };
        if ('@id' in shape) {
            const id = shape['@id'];
            customShape.title = extractNameFromIdArray(id);
        }
        if ('sh:property' in shape) {
            customShape.elements = analyzeProperties(shape['sh:property'], index);
        }
        customShapes.push(customShape);
    });
    return customShapes;
};
/**
 * analyzeProperties() is a Private fn
 * extracts the relevant data for each 'sh:property' object from JSONLD
 * @param {property[]} properties is the array of properties
 * @param {number} parentIndex
 * @returns {element[]} elements is the returned custom array
 */
function analyzeProperties(properties, parentIndex) {
    let elements = [];
    properties.forEach((property, propertyIndex) => {
        let element = { type: '', name: '', id: '' };
        if ('sh:name' in property) {
            const name = property['sh:name'];
            element.name = unCamelCase(name);
        }
        else if ('sh:path' in property) {
            const dataPath = property['sh:path'];
            const path = extractNameFromIdArray(Object.values(dataPath)[0]);
            element.name = unCamelCase(path);
        }
        if ('sh:path' in property) {
            const dataPath = property['sh:path'];
            const path = extractNameFromIdArray(Object.values(dataPath)[0]);
            element.id = `${toKebabCase(path)}-${parentIndex}-${propertyIndex}`;
            // exception for schema:email
            if (path === 'email') {
                element.type = path;
            }
        }
        else if ('sh:name' in property) {
            const name = property['sh:name'];
            element.id = `${toKebabCase(name)}-${parentIndex}-${propertyIndex}`;
        }
        if ('sh:description' in property) {
            element.description = property['sh:description'];
        }
        if ('sh:maxCount' in property) {
            element.max = property['sh:maxCount'];
        }
        if ('sh:minCount' in property) {
            element.min = property['sh:minCount'];
        }
        if ('sh:pattern' in property) {
            element.pattern = property['sh:pattern'];
        }
        if ('sh:in' in property) {
            const dataList = property['sh:in'];
            const list = Object.values(dataList)[0];
            if (list.length) {
                element.list = createList(list);
            }
        }
        if ('sh:datatype' in property && !element.type.length) {
            const dataType = property['sh:datatype'];
            const type = Object.values(dataType)[0];
            element.type = extractNameFromIdArray(type);
        }
        elements.push(element);
    });
    return elements;
}
/**
 * extractNameFromIdArray() is a Private fn
 * @param {string} name
 * @returns {string} name
 */
function extractNameFromIdArray(name) {
    if (/#/g.test(name)) {
        const tempName = name.split('#')[1];
        name = tempName.replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3').replace(/(shape|Shape)/g, '').trim();
    }
    else if (/:/g.test(name)) {
        name = removeContext(name);
    }
    return name;
}
/**
 * createList() is a Private fn
 * @param {string[]} list
 * @returns {elementList[]} Object
 */
function createList(list) {
    const listObject = [];
    list.forEach((listElement) => {
        const elementObject = {
            'label': unCamelCase(listElement),
            'value': listElement
        };
        listObject.push(elementObject);
    });
    return listObject;
}
/**
 * removeContext() is a Private fn
 * @param {string} name
 * @returns {string} name
 */
function removeContext(name) {
    for (const key in context) {
        if (name.toLowerCase().includes(key)) {
            return name.replace(`${key}:`, '');
        }
    }
    return name;
}
//# sourceMappingURL=shapes.js.map