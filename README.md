# Solid FE Form CLI

<!-- TOC -->
- [Introduction](#introduction)
- [CLI commands](#commands)
- [Install](#install)
- [Usage and examples](#usage)
  - [Help](#help)
  - [List shapes available](#usage-list-shapes)
  - [Set custom CSS styles](#usage-set-custom-styles)
  - [Create form file and dependencies](#usage-create)
- [Uninstall](#uninstall)
- [Changelog](#changelog)
<!-- TOC -->

<br/>

## Introduction <a name="introduction"></a>

The Solid Front End Form CLI is meant to help creating forms on Vue/Angular frameworks from SHACL (Shapes Constraint Language) files.

The [```create```](#usage-create) comamnd recreates a ```<form>``` using the rules from a SHACL file on the framework selected.

The available frameworks are: **Vue3** and **Angular2**.

All outputted forms components are created without styles.

For both frameworks, all [HTML form elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) have been implemented. For each form element, all possible attributes and values have been taken in consideration.

But, only the ```<input>``` element is considered in the mapping as of now.

Please, check ```BASIC_TYPE_MAP``` in ```constants.ts``` for a mapping between ```sh:datatype``` and basic components and its types.

See [Changelog](#changelog) for the current status of the CLI.

<br/>

## CLI commands <a name="commands"></a>

- ```sfef set-custom-css``` :
    Set up custom CSS classes to be used in the FE form component.

- ```sfef create -f <framework> -s <shape> [-c]``` :
    Creates the form (following SHACL shape) and required dependencies according to the selected framework.

- ```sfef list-shapes``` :
    List of available shapes (SHACL .ttl files).

<br/>

## Install <a name="install"></a>

- Solid-sfef-cli is a development CLI tool, it is recommened to install it using ```--global``` parameter. The following commands can be used:

    ```bash
    npm install @solidlab/solid-sfef-cli --global
    ```

    or

    ```bash
    npm i @solidlab/solid-sfef-cli -g
    ```

- It could also be installed locally as a dev dependency using ```--save-dev``` parameter. The following commands can be used:

    ```bash
    npm install @solidlab/solid-sfef-cli --save-dev
    ```

    or

    ```bash
    npm i @solidlab/solid-sfef-cli -D
    ```

<br/>

## Usage and examples<a name="usage"></a>

**The current section bash commands are under the asumption that the installation was done globally**.

If the installation was done **locally** bash commands shoulb be adapted accordingly.

e.g.

instead of

```bash
sfef list-shapes
```

use

```bash
node . list-shapes
```

### Help <a name="help"></a>

Use the help command to print out the commands and parameters available in the CLI tool.

```bash
sfef help
```

<br/>

### Set custom CSS styles <a name="usage-set-custom-styles"></a>

Define some custom CSS classes to be used when creating the form.

```bash
sfef set-custom-css
```

The command asks for CSS classes on:

- ```<form>``` element
- ```<div>``` wrapper around input and label
- ```<label>``` element
- ```<em>``` element which contains additional information binded to the label (```sh:description```)
- ```<input>``` element

The custom classes are stored in project root under filename **form-custom-classes.json**.

Example of custom CSS classes json structure:

```json
[
    {
        "element":"form",
        "classes":["css-custom__form"]
    }, {
        "element":"input-wrapper",
        "classes":["css-custom__wrapper"]
    }, {
        "element":"input-label",
        "classes":["css-custom__label", "css-custom__label--bold"]
    }, {
        "element":"input-additional-info",
        "classes":["css-custom__info"]
    }, {
        "element":"input-element",
        "classes":["css-custom__input", "css-custom__input--required"]
    }
]
```

<br/>

### Create form file and dependencies <a name="usage-create"></a>

Creates the form component according to frame selected (vue or angular) and the shape (.ttl file).

The ```create``` command has 2 required parameters (```--framework``` and ```--shape```) and 1 optional parameter (```--css```).

```bash
sfef create --framework <vue/angular> --shape <fileName/Path>
```

or

```bash
sfef create -f <vue/angular> -s <fileName/filePath>
```

With the optional parameter ```--css```, the component file will include the css classes available in **form-custom-classes.json**.
This json file needs to be created using the [```set-custom-css```](#usage-set-custom-styles) command.

```bash
sfef create --framework <vue/angular> --shape <fileName/filePath> --css
```

or

```bash
sfef create -f <vue/angular> -s <fileName/filePath> --c
```

The shape could be an **absolute path** or a **file Name (relative path)**.
The relative path refers to the solid-sfef-cli package.
Check available .ttl file names using ```sfef list-shapes``` command.

examples of valid **fileName** values:

- ```'adresregister-SHACL'```

    a .ttl file name from ```'.assets/shacl'``` folder in the cli package.

- ```'/Users/myname/Documents/GIT/myProject/.shapes/my-project-shape.ttl'```

    an absolute path.

<br/>

#### Vue example

```bash
sfef create -f vue -s example
```

Executing above command will create the ```FormExample.vue``` file in ```src/vue``` folder along with all depency components (```BasicInput.vue``` and ```BasicOption.vue```).

The ```example.ttl``` includes various input types: ```text```, ```date```, ```email```, ```checkbox``` and ```number```.

Being ```'Given name'```, ```'Family name'```, ```'Street address'```, ```'house number'``` and ```'Postal code'``` required fields.

The ```'Genre'``` field uses a ```<datalist>``` to restrict the options allowed.

Finally ```'Postal code'``` uses a ```regex``` pattern.

```html
// FormExample.vue
<template>
<form id="example" class="">
    <h2>PersonShape</h2>
    <BasicInput
        inputType="text"
        inputId="given-name-0-0"
        inputName="given-name-0-0"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Given name or first name"
        inputLabelClass="input-label "
        :inputRequired="true"
    />
    <BasicInput
        inputType="text"
        inputId="family-name-0-1"
        inputName="family-name-0-1"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Family name or surname"
        inputLabelClass="input-label "
        :inputRequired="true"
    />
    <BasicInput
        inputType="date"
        inputId="birth-date-0-2"
        inputName="birth-date-0-2"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Birth Date"
        inputLabelClass="input-label "
    />
    <BasicInput
        inputType="text"
        inputId="gender-0-3"
        inputName="gender-0-3"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Gender"
        inputLabelClass="input-label "
        inputListId="list-gender-0-3"
        :inputListOptions='[{"label":"Female","value":"female"},{"label":"Male","value":"male"}]'
    />
    <BasicInput
        inputType="email"
        inputId="email-0-4"
        inputName="email-0-4"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="E-mail address"
        inputLabelClass="input-label "
    />
    <BasicInput
        inputType="checkbox"
        inputId="receive-newsletter-0-5"
        inputName="receive-newsletter-0-5"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Receive newsletter"
        inputLabelClass="input-label "
    />
    <BasicInput
        inputType="text"
        inputId="address-0-6"
        inputName="address-0-6"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Address"
        inputLabelClass="input-label "
    />
    <h2>AddressShape</h2>
    <BasicInput
        inputType="text"
        inputId="street-address-1-0"
        inputName="street-address-1-0"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Street Address"
        inputLabelClass="input-label "
        :inputRequired="true"
    />
    <BasicInput
        inputType="number"
        inputId="street-number-1-1"
        inputName="street-number-1-1"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Street Number"
        inputLabelClass="input-label "
        :inputRequired="true"
    />
    <BasicInput
        inputType="text"
        inputId="postal-code-1-2"
        inputName="postal-code-1-2"
        inputForm="example"
        inputWrapperClass=""
        inputClass=""
        inputLabel="Postal Code"
        inputLabelClass="input-label "
        inputAdditionalInfo="Type postal code: 2 letters + 4 digits"
        inputLabelInfoClass=""
        :inputRequired="true"
        inputPattern="[a-z A-Z]{2}[0-9]{4}"
    />
</form>
</template>
<script lang="ts">
import { defineComponent } from "vue"

import BasicInput from "./components/BasicInput.vue"
export default defineComponent({
    name: "FormExample",
    components: {
        BasicInput,
    },
})
</script>
```

Which will look like:

<img
    src=".assets/images/vue_example_form_no_styling.png"
    width="400"
    alt="form without styling"/>

and with a some minimal styling:

<img
    src=".assets/images/vue_example_form_styling.png"
    width="400"
    alt="form with styling"/>

when all fields are filled properly:

<img
    src=".assets/images/vue_example_form_styling_ok.png"
    width="400"
    alt="form with styling and filled correctly"/>

<br/>

#### Angular example

```bash
sfef create -f angular -s another-example -c
```

Executing above command will create the ```FormAnotherExample.component.html``` and ```FormAnotherExample.component.ts``` file in ```src/app/FormAnotherExample``` folder along with ```BasicInput``` depency component.

The ```another-example.ttl``` shape includes ```text``` and ```email``` input types.

Being ```'Given name'```, ```'Family name'```, ```'Country'```, ```'City'```, ```'Street Line'```, ```'Postal code'``` and ```'Organization name'``` required fields.

As the optional parameter ```-c``` (```--css```) is also present, thus the css classes from ```form-custom-classes.json``` are applied to corresponding elements.

```json
[
    {"element":"form","classes":["css__form"]},
    {"element":"input-wrapper","classes":["css__wrapper"]},
    {"element":"input-label","classes":["css__label"]},
    {"element":"input-additional-info","classes":["css__xtra-info"]},
    {"element":"input-element","classes":["css__input"]}
]
```

Resulting in following ```html``` and ```ts``` files:

```html
// FormAnotherExample.component.html
<form id="another-example" class="css__form">
    <h2>Contact</h2>
    <app-basic-input
        inputType="text"
        inputId="given-name-0-0"
        inputName="given-name-0-0"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Given Name"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="family-name-0-1"
        inputName="family-name-0-1"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Family Name"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="email"
        inputId="email-0-2"
        inputName="email-0-2"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Email"
        inputLabelClass="input-label css__label"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="address-0-3"
        inputName="address-0-3"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Address"
        inputLabelClass="input-label css__label"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="works-for-0-4"
        inputName="works-for-0-4"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Works For"
        inputLabelClass="input-label css__label"
    ></app-basic-input>
    <h2>Address</h2>
    <app-basic-input
        inputType="text"
        inputId="address-country-1-0"
        inputName="address-country-1-0"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Country"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="address-locality-1-1"
        inputName="address-locality-1-1"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="City"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="street-address-1-2"
        inputName="street-address-1-2"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Street Line"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="postal-code-1-3"
        inputName="postal-code-1-3"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Postal Code"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <h2>Organization</h2>
    <app-basic-input
        inputType="text"
        inputId="name-2-0"
        inputName="name-2-0"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Organization Name"
        inputLabelClass="input-label css__label"
        inputRequired="true"
    ></app-basic-input>
    <app-basic-input
        inputType="text"
        inputId="address-2-1"
        inputName="address-2-1"
        inputForm="another-example"
        inputWrapperClass="css__wrapper"
        inputClass="css__input"
        inputLabel="Organization Address"
        inputLabelClass="input-label css__label"
    ></app-basic-input>
</form>
```

and

```ts
// FormAnotherExample.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

import { BasicInputComponent } from "../components/BasicInput/BasicInput.component"

@Component({
    selector: "app-form-another-example",
    standalone: true,
    imports: [
        BasicInputComponent,
    ],
    templateUrl: './FormAnotherExample.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormAnotherExample {
}

```

Which will look like:

<img
    src=".assets/images/angular_example_form_no_styling.png"
    width="400"
    alt="form without styling"/>

and with a some minimal styling:

<img
    src=".assets/images/angular_example_form_styling.png"
    width="400"
    alt="form with styling"/>

when all fields are filled properly:

<img
    src=".assets/images/angular_example_form_styling_ok.png"
    width="400"
    alt="form with styling and filled correctly"/>

<br/>

### List shapes available <a name="usage-list-shapes"></a>

List the actual available shapes inside the solid-sfef-cli package.

```bash
sfef list-shapes
```

A part from the listed shapes, the ```create``` command also allows to use global path for any shape file.

Example of package's shapes folder path on OSX: ```'/Users/myname/node_modules/@solidlab/solid-sfef-cli/.assets/shacl/'```

<br/>

## Uninstall <a name="uninstall"></a>

To uninstall, simply run:

- for global installation:

    ```bash
    npm uninstall @solidlab/solid-sfef-cli --global
    ```

    or

    ```bash
    npm rm @solidlab/solid-sfef-cli -g
    ```

- for development installation:

    ```bash
    npm uninstall @solidlab/solid-sfef-cli --save-dev
    ```

    or

    ```bash
    npm rm @solidlab/solid-sfef-cli -D
    ```

<br/>

## Changelog <a name="changelog"></a>

### version 0.1.0 - January 2024

The ```create``` functionality is adapted to a small amount of shape scenarios.
See ```./assets/shacl/``` for some examples.

As a result only ```<input>``` element is in consideration.
With only a small amount of attributes take in account: ```id```, ```name```, ```form```, ```type```, ```pattern```, ```required``` and ```list```.

With only attribute ```type``` values ```text```, ```number```, ```checkbox```, ```email```, ```url```, ```date```, ```time```, ```datetime-local``` and ```month``` considered.
Please, check ```BASIC_TYPE_MAP``` in ```constants.ts``` for a mapping between ```sh:datatype``` and basic components and its types.

Along with the ```<input>``` element, the  ```<label>``` element, with and option to add an additional information to it (```<span>```).

Anyway, in both frameworks, the basic HTML forms elements has been created, and are ready to be implemented.

The ```<input>```, ```<button>```, ```<fieldset>```, ```<select>``` and ```<textarea>``` components are created with all the possible attributes and values.

So, the package is ready to be extended for any particular shapes scenarios, or simply be custom adapted.
