const fs = require('fs');
const path = require('path');

const validOptions = {
    name: 'name',
    n: 'name',
    dir: 'dir',
    d: 'dir',
    style: 'style',
    s: 'style',
    cmpType: 'cmpType',
    'cmp-type': 'cmpType',
    ct: 'cmpType'
}

const defaultOptions = {
    dir: 'cmps',
    style: 'scss',
    cmpType: 'class'
}

const cleanOption = (op) => {
    if (op.includes('--')) {
        op = op.substr(2, op.length)
        return validOptions[op]
    }

    if (op.includes('-')) {
        op = op.substr(1, op.length)
        return validOptions[op]
    }

    throw "option name must start with '--' or '-"
}

const validateOption = (op) => {
    if (!validOptions[op]) throw `'${op}' is not a valid option!`
}

const validateValue = (val) => {
    if (val === null || val === undefined || val === '') {
        throw 'each option must have value!'
    }
}

const parseOptions = (args) => {
    const options = Object.assign({}, defaultOptions)

    for (let i = 0; i < args.length; i = i + 2) {
        const op = cleanOption(args[i])
        const val = args[i + 1]

        validateOption(op)
        validateValue(val)

        options[op] = val
    }

    if (!options.name) throw 'name is required!'

    return options
}

const componentClassTemplate = (cmpName, style) => `
import { Component } from 'react'

import './${cmpName}.${style}'

export class ${cmpName} extends Component {

    render() {

    }
}

`

const componentFunctionTemplate = (cmpName, style) => `
import './${cmpName}.${style}'

export const ${cmpName} = (props) => {

    return {

    }
}

`

const styleTemplate = (styleName) => {
    const name = styleName.charAt(0).toLowerCase() + styleName.slice(1)
    return `.${name} {}`
}

const showHelp = () => {
    console.log('create-component usage:')
    console.log('node create-component --name <cmp-name> [--dir <name>] [--cmp-type <class|func>] [--style <type>]')
    console.log('')
    console.log('   --name      required')
    console.log('   --dir       optional, default: components')
    console.log('   --cmpType   optional, default: class')
    console.log('   --style     optional, default: scss')
}

try {
    const args = process.argv.splice(2)
    if (args[0] === '--help' || args[0] === '--') {
        showHelp()
        return
    }

    const options = parseOptions(args)
    const { name, dir, style, cmpType } = options
    const rootDir = path.join(__dirname, `/src/${dir}/${name}`)

    fs.mkdirSync(rootDir);

    fs.writeFileSync(`${rootDir}/${name}.${style}`, styleTemplate(name))
    console.log("css file created successfully");

    const template = cmpType === 'class' ? componentClassTemplate : componentFunctionTemplate
    fs.writeFileSync(`${rootDir}/${name}.jsx`, template(name, style))
    console.log("component file created successfully");

    fs.writeFileSync(`${rootDir}/index.js`, `export { ${name} } from './${name}'`);
    console.log("index file created successfully");
} catch (e) {
    console.log('ERROR:', e.message ? e.message : e)
}
