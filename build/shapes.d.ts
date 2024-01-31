#!/usr/bin/env node
import { customShape } from './types.js';
/**
 * getListOfShapes() is an async Public fn
 * Returns the list of available shape files (.ttl)
 * @returns {Promise<string[]>} list of .ttl files
 */
export declare const getListOfShapes: () => Promise<string[]>;
/**
 * getShape() is an async Public fn
 * Calls readShape() first with file as a absolute path
 * and if it fails it tries a relative path
 * and returns the @graph data converted to a custom JSON using convertShape()
 * @param {string} file is the name of the shape to read
 * @returns {Promise<customShape>} custom JSON shape
 */
export declare const getShape: (file: string) => Promise<false | customShape[]>;
