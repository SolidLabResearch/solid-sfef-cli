#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'node:fs';
import chalk from 'chalk';
import { hideBin } from 'yargs/helpers';
import { createClasses, readClasses } from './utils.js';
import { getListOfShapes, getShape } from './shapes.js';
import { createVueForm } from './vueForm.js';
import { createAngularForm } from './angularForm.js';
import { PKG, FRAMEWORKS } from './constants.js';
import { resolveOriginPath } from './utils.js';
let FORM_SHAPES = await getListOfShapes();
const yargsInstance = yargs(hideBin(process.argv));
const pkg = JSON.parse(fs.readFileSync(resolveOriginPath(PKG), 'utf8'));
/**
 * Commands:
 * * create --framework [vue|angular] --shape [shapeFileName] --css
 * * list-shapes
 * * set-custom-css
 */
yargsInstance
    .command('create', chalk.dim('Create form component following SHACL shape'), (args) => {
    return args
        .example('$0 create -f vue -s adresregister-SHACL -c', chalk.dim('Create the Vue files following the adresregister-SHACL.ttl rules with custom css classes'))
        .example('$0 create --framework angular --shape test', chalk.dim('Create the Vue files following the test.ttl rules without custom css'))
        .option('framework', {
        alias: 'f',
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: chalk.dim('select corresponding FE framework'),
        choices: FRAMEWORKS,
    })
        .option('shape', {
        alias: 's',
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: chalk.dim('select corresponding shape (SHACL .ttl file)'),
    })
        .option('css', {
        alias: 'c',
        type: 'boolean',
        description: chalk.dim('Use default or add custom CSS classes, when file available'),
        default: false
    });
}, async (argv) => {
    let customClasses = [];
    let customJson = {};
    if (argv.css === true) {
        customClasses = await readClasses();
        if (customClasses.length === 0) {
            console.log('Command has been %s... There\'s no custom CSS file available.', chalk.red.bold('cancelled'));
            console.log('Please, use: %s to set custom styles, or avoid it.', chalk.italic('sfef set-custom-css'));
            return;
        }
    }
    customJson = await getShape(argv.shape);
    if (!customJson) {
        console.error(chalk.red('select an appropriate shape'));
    }
    else if (argv.framework === 'vue') {
        await createVueForm(customJson, argv.shape, customClasses);
    }
    else if (argv.framework === 'angular') {
        await createAngularForm(customJson, argv.shape, customClasses);
    }
    else {
        console.error(chalk.red('select appropriate framework'));
    }
})
    .command('list-shapes', chalk.dim('List of available shapes (SHACL .ttl files)'), () => { }, async (argv) => {
    FORM_SHAPES = await getListOfShapes();
    if (FORM_SHAPES.length) {
        console.log(chalk.dim(`There ${FORM_SHAPES.length > 1 ? 'are' : 'is'} ${FORM_SHAPES.length} available shapes:`));
        FORM_SHAPES.forEach((shape) => console.log(`  · ${shape}`));
    }
    else {
        console.error(chalk.red('There are no available shapes'));
    }
})
    .command('set-custom-css', chalk.dim('Set up custom CSS classes to be used in the form component'), () => { }, async (argv) => {
    await createClasses();
    console.log(chalk.dim('Custom CSS classes file created.'));
})
    .wrap(yargsInstance.terminalWidth())
    .alias('h', 'help')
    .help('help', chalk.dim('Show help'))
    .alias('v', 'version')
    .version('version', chalk.dim('Show version number'), pkg.version)
    .argv;
//# sourceMappingURL=cli.js.map