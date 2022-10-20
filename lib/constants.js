import * as dotenv from 'dotenv'
import path from 'path'
import _ from 'lodash'

dotenv.config()

export const APP_TO_LOCALE_MAP = {
  indonesia: ['id-id'],
  malaysia: ['en-my', 'my-my'],
  australia: ['en-en'],
}

export const DEFAULT_LANG_MAP = {
  englishEnglish: 'en-en',
  englishMalaysia: 'en-my'
}

export const INTL_JS_PREFIX = {
  indonesia: 'id.i18n.js',
  malaysia: 'ms.i18n.js',
  default: 'i18n.js'
}

// THIS TOOLS ROOT
export const ROOT_DIR_PATH = path.resolve('.')

// OUTPUT
export const OUT_ROOT_DIR_PATH = path.join(ROOT_DIR_PATH, 'out')
export const OUT_TRANSLATION_DIR_PATH = path.join(OUT_ROOT_DIR_PATH, 'translation')

// PROJECT
export const PROJECT_DIR_PATH = path.resolve(process.env['PROJECT_DIR_PATH'])
export const PROJECT_SRC_DIR_PATH = path.join(PROJECT_DIR_PATH, 'src')
export const PROJECT_SRC_PAGES_PATH = path.join(PROJECT_SRC_DIR_PATH, 'pages')
export const PROJECT_SRC_TRANSLATES_PATH = path.join(PROJECT_SRC_DIR_PATH, 'translates')
export const PROJECT_SRC_COMPONENTS_PATH = path.join(PROJECT_SRC_DIR_PATH, 'pages')
export const PROJECT_SRC_LOCALE_DIR_PATH = path.join(PROJECT_SRC_DIR_PATH, 'i18n', 'locales')
export const PROJECT_TEST_FILES_PATH = path.join(PROJECT_SRC_DIR_PATH, '**/__tests__/**/*')
export const PROJECT_DEFAULT_INTL_GLOB = path.join(PROJECT_SRC_DIR_PATH, '*(pages|components)', `**/*.${INTL_JS_PREFIX.default}`)

export const PROJECT_SRC_CODE_PATH = path.join(PROJECT_SRC_DIR_PATH, '*(pages|components)', `**/*.js`)

export const PROJECT_INDONESIA_INTL_GLOB = path.join(PROJECT_SRC_DIR_PATH, 'translates', `**/*.${INTL_JS_PREFIX.indonesia}`)
export const PROJECT_MALAYSIA_INTL_GLOB = path.join(PROJECT_SRC_DIR_PATH, 'translates', `**/*.${INTL_JS_PREFIX.malaysia}`)

export const LIB_DIR_PATH = path.join(ROOT_DIR_PATH, 'lib')

export const REGEX_STRING = {
  formattedMessage: /(?<all>(?<before>[\{\n\s]*)(?<main><FormattedMessage(?<props>(?<defaultMessage>[\n\s]*defaultMessage=\{[\w\.]+\}[\n\s]*)*(?<id>[\n\s]*id=\{[\w\.]+\}[\n\s]*)*(?<spread>[\n\s]*\{[\n\s]*\.\.\..+[\n\s]*\}[\n\s]*)*(?<values>values=\{\{[\n\s]*.+[\n\s]*\}\}[\n\s]*)*)\/\>)(?<after>[\}\n\s]*))/g
}

export const READ_FILE_OPTIONS = { encoding: 'utf-8' }

export const ERROR_HANDLER = {
  glob: (string) => console.log(`glob error: ${string}`)
}
