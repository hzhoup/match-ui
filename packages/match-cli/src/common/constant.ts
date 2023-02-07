import { resolve } from 'path'

export const CWD = process.cwd()

export const ESLINT_EXTENSIONS = ['.vue', '.ts', '.js', '.mjs', '.tsx', '.jsx']
export const UI_PACKAGE_JSON = resolve(CWD, 'package.json')
