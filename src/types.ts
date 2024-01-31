#!/usr/bin/env node
export type customClass = {
    element: string,
    classes: Array<string>
}

export type jsonLDGraph = {
    '@id': string,
    '@type': string | Array<string>,
    'sh:targetClass': Object,
    'sh:property': Array<property>,
    'sh:closed'?: boolean
}
export type property = {
    'sh:name'?: string,
    'sh:description'?: string,
    'sh:path'?: {},
    'sh:datatype'?: {},
    'sh:class'?: {},
    'sh:minCount'?: number,
    'sh:maxCount'?: number
}

export type customShape = {
    'title': string,
    'elements': Array<element>
}
export type elementList = {
    'label': string,
    'value': string
}
export type element = {
    'id': string,
    'name': string,
    'description'?: string,
    'max'?: number,
    'min'?: number,
    'pattern'?: string | any,
    'list'?: elementList[],
    'type': string
}

export type createOpt = {
    '_': string[],
    '$0': string,
    'framework': string,
    'f': string,
    'shape': string,
    's': string,
    'css'?: boolean | undefined,
    'c'?: boolean | undefined
}
