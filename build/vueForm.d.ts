#!/usr/bin/env node
import { customShape, customClass } from './types.js';
/**
 * createVueForm() is an async Public fn
 * creates and writes the Vue form component file, and copies all basic elements components needed.
 * @param {Array<customShape>} customJson
 * @param {string} fileName
 * @param {Array<customClass>} customCss
 */
export declare const createVueForm: (customJson: Array<customShape>, fileName: string, customCss: Array<customClass>) => Promise<void>;
