import fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import glob from 'glob'
import _ from 'lodash'
import * as constants from '../lib/constants.js'
import * as str from '../lib/stringHelper.js'
import extractImportedMessage from '../lib/extractImportedMessage.js'
import { extractFormattedMessage, extractFormattedHtmlMessage } from '../lib/extractRegexMatch.js'
import extractReactIntlUsage from '../lib/extractReactIntlUsage.js'
import { checkAllFormattedMessage } from '../lib/checkAll.js'
import crossCheckImport from '../lib/crossCheckImport.js'

function Crawler() {
  const ignore = [
    `${constants.PROJECT_SRC_DIR_PATH}/**/*.i18n.js`,
    `${constants.PROJECT_SRC_DIR_PATH}/**/__tests__/**/*`,
    `${constants.PROJECT_SRC_TRANSLATES_PATH}/**/*`
  ]
  let walked = 1
  let formattedMessageAll = 0 
  let ok = 0
  let crossImport = {}

  try {
    const files = glob.sync(constants.PROJECT_SRC_CODE_PATH, { ignore })
    fsExtra.mkdirpSync(constants.OUT_REGISTRY_DIR_PATH)

    files.forEach((fileName, index) => {
      let rawString = fs.readFileSync(fileName, constants.READ_FILE_OPTIONS)

      crossCheckImport(fileName, rawString, crossImport, files)

      formattedMessageAll += checkAllFormattedMessage(rawString)
      const importedMessage = extractImportedMessage(fileName, rawString)
      const formattedMessage = extractFormattedMessage(fileName, rawString)
      ok += formattedMessage.length
      const formattedHtmlMessage = extractFormattedHtmlMessage(fileName, rawString)
      const reactIntlUsage = extractReactIntlUsage(rawString)
      if (formattedMessage.length > 0) {
        let dir_name = path.dirname(fileName)
        let file_name = path.basename(fileName)
        dir_name = str.stripSrc(dir_name)
        dir_name = str.stripLeadSlash(dir_name)
        dir_name = path.join(constants.OUT_REGISTRY_DIR_PATH, dir_name)
        file_name = path.join(dir_name, `${file_name}.json`)
        fs.mkdirSync(dir_name, { recursive: true })
        fs.writeFileSync(file_name, JSON.stringify({
          file: {
            click: `file://${fileName}`,
            name: fileName
          },
          import: importedMessage,
          formattedMessage,
          formattedHtmlMessage,
          reactIntlUsage,
        }, null, 2))
      }
      walked += 1
    })
  } catch (e) {
    console.log(e)
  }
  fs.writeFileSync(path.join(constants.OUT_ROOT_DIR_PATH, 'cross.json'), JSON.stringify({
    crossImport,
  }, null, 2))
  // console.log(crossImport)
  console.log({ walked, formattedMessageAll, ok })
}

Crawler()