import fs from 'fs'
import path from 'path'
import glob from 'glob'
import sortKeys from 'sort-keys'
import _ from 'lodash'
import * as str from '../lib/stringHelper.js'

import * as constants from '../lib/constants.js'
import extractTranslation from '../lib/extractTranslation.js'

function generate() {
  let lang = {}
  try {
    const files = glob.sync(constants.PROJECT_DEFAULT_INTL_GLOB)
    files.forEach((fileName, index) => {
      let fn = str.stripSrc(fileName)
      fn = str.stripLeadSlash(fn)
      fn = str.stripLast(fn)
      const dotName = str.camelDot(fn)
      const raw = fs.readFileSync(fileName, constants.READ_FILE_OPTIONS)
      const enEn = extractTranslation(raw, constants.DEFAULT_LANG_MAP.englishEnglish, fn)
      const enMy = extractTranslation(raw, constants.DEFAULT_LANG_MAP.englishMalaysia, fn)
      lang[`${dotName}`] = _.merge(enEn, enMy)
    })
  } catch { }

  try {
    const files = glob.sync(constants.PROJECT_INDONESIA_INTL_GLOB)
    files.forEach((fileName) => {
      const locale = constants.APP_TO_LOCALE_MAP.indonesia[0]
      let fn = str.stripSrcTranslates(fileName)
      fn = str.stripLeadSlash(fn)
      fn = str.stripLast(fn)
      fn = str.camelDot(fn)
      const raw = fs.readFileSync(fileName, constants.READ_FILE_OPTIONS)
      const idId = extractTranslation(raw, locale)
      lang[fn] = _.merge(lang[fn], idId)
    })
    console.log(2)
  } catch { }

  try {
    const files = glob.sync(constants.PROJECT_MALAYSIA_INTL_GLOB)
    files.forEach((fileName) => {
      const locale = constants.APP_TO_LOCALE_MAP.malaysia[1]
      let fn = str.stripSrcTranslates(fileName)
      fn = str.stripLeadSlash(fn)
      fn = str.stripLast(fn)
      fn = str.camelDot(fn)
      const raw = fs.readFileSync(fileName, constants.READ_FILE_OPTIONS)
      const myMy = extractTranslation(raw, locale)
      lang[fn] = _.merge(lang[fn], myMy)
    })
  } catch { }

  lang = sortKeys(lang)
  fs.writeFileSync(path.join(constants.OUT_ROOT_DIR_PATH, 'tranlation.json'), JSON.stringify(lang, null, 2))
}

generate()