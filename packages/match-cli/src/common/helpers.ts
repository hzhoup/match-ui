import fse from 'fs-extra'
import { UI_PACKAGE_JSON } from './constant.js'

const { lstatSync, pathExistsSync, readJSONSync } = fse

export function getVersion() {
  return readJSONSync(UI_PACKAGE_JSON).version
}

export const isDir = (file: string): boolean => pathExistsSync(file) && lstatSync(file).isDirectory()
