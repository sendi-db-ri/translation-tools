import fs from 'fs'

import path from 'path'

import _ from 'lodash'

import * as constants from './constants.js'

export const removeImportedContant = (input) => input.replace(/^import.*[\s\S]+';/gm, '')

export const removeImport = (input) => input.replace(/^import.*[\s\S]+';/gm, '')

export const removeExport = (input) => input.replace(/^export\s+default.*\s/gm, '')

export const removeAuMessageToEnd = (input) => input.replace(/.*auMessages;$\s/gm, '')

export const removeEslint = (input) => input.replace(/^\/\*\s*eslint.*\s/gm, '')

export const replaceCurrencySymbol = (input) => `${input}`.replaceAll(/\$\{CURRENCY_SYMBOL\}/gm, '{currency_symbol}')

export const replacePlatformLink = (input) => input.replaceAll(/\$\{PLATFORM_LINK_MY\}/gm, '{platform_link_my}')

export const wrapDefault = (input, lang = constants.DEFAULT_LANG_MAP.englishEnglish) => {
  let wrapper = fs.readFileSync(path.join(constants.LIB_DIR_PATH, 'template','wrapDefault.js'), constants.READ_FILE_OPTIONS)

  wrapper = wrapper.replace('{{ENTRY}}', `
// const lang='${lang}'${input}`)

  return wrapper
}

export const wrapNonDefault = (input, lang = constants.DEFAULT_LANG_MAP.englishEnglish) => {
  let wrapper = fs.readFileSync(path.join(constants.LIB_DIR_PATH, 'template','wrapNonDefault.js'), constants.READ_FILE_OPTIONS)

  wrapper = wrapper.replace('{{ENTRY}}', `
// const lang='${lang}'${input}`)

  return wrapper
}

export const stripSrc = (string) => string.replace(constants.PROJECT_SRC_DIR_PATH, '')

export const stripSrcTranslates = (string) => string.replace(constants.PROJECT_SRC_TRANSLATES_PATH, '')

export const stripDotJs = (string) => string.replace(/.js$/, '')

export const stripLeadSlash = (string) => string.replace(/^\//, '')

export const stripLast = (string) => string.replace(/(.+\/)([\w]+).+$/, '$1$2')

export const getLast = (string) => string.replace(/(.+\/)([\w]+).+$/, '$2')

export const camelDot = (string) => string.split('/').map(_.camelCase).join('.')

export const removeIdPrefix = (string) => string.replace(/\[`\$\{idPrefix\}\.(\w+)`\]/gm, '$1')
