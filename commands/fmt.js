import sortKeys from 'sort-keys'

import fs from 'fs'
import path from 'path'
import glob from 'glob'
import _ from 'lodash'
import * as constants from '../lib/constants.js'
import * as str from '../lib/stringHelper.js'

glob(constants.PROJECT_SRC_CODE_PATH, {
  ignore: [
    `${constants.PROJECT_SRC_DIR_PATH}/**/*.i18n.js`,
    `${constants.PROJECT_SRC_DIR_PATH}/**/__tests__/**/*`,
    `${constants.PROJECT_SRC_TRANSLATES_PATH}/**/*`
  ]
}, (err, files) => {
  let walked = 1
  let fileWithMatch = 0
  let totalMatch = 0
  const allList = []
  const detailList = []
  fs.mkdirSync(path.join(constants.OUT_ROOT_DIR_PATH, 'registry'), { recursive: true })
  files.forEach((fileName) => {
    let file = str.stripSrc(fileName)
    let camelFile = _.camelCase(file)
    try {
      let rawString = fs.readFileSync(fileName, { encoding: 'utf-8' })

      let importedIntlRegex = /(?<all>import\s+(?<name>[\w]+)\s+from\s+'(?<source>.*\.i18n)';)/g

      let importedIntl = [...rawString.matchAll(importedIntlRegex)]

      if (importedIntl.length > 1) {
        // console.log(`file:${fileName}`)
        const mg = importedIntl.map((match) => match.groups)
        mg.forEach((m) => {
          let x = Object.fromEntries(Object.entries(m))
          console.log(x.all)
          console.log(`file:${path.resolve(path.dirname(fileName), `${x.source}.js`)}`)
        })
      }

      // if (importedIntl === null) console.log(fileName)
      // console.log(importedIntl)

      // if (importedIntl.length < 1) console.log(fileName)
      // if (importedIntl?.includes?.('messagesForBank')) console.log(fileName)
      // if (importedIntl) console.log(importe)

      // console.log(importedIntl)

      let regExpAll = /<FormattedMessage/g

      let allMatches = [...rawString.matchAll(regExpAll)]
      if (allMatches?.length > 0) allList.push(fileName)

      let regExpDetail = /(?<all>(?<before>[\{\n\s]*)(?<main><FormattedMessage(?<props>(?<defaultMessage>[\n\s]*defaultMessage=\{[\w\.]+\}[\n\s]*)*(?<id>[\n\s]*id=\{[\w\.]+\}[\n\s]*)*(?<spread>[\n\s]*\{[\n\s]*\.\.\..+[\n\s]*\}[\n\s]*)*(?<values>values=\{\{[\n\s]*.+[\n\s]*\}\}[\n\s]*)*)\/\>)(?<after>[\}\n\s]*))/g

      let fileMatches = [...rawString.matchAll(regExpDetail)]
      const json = {
        file,
        match: []
      }
      if (fileMatches?.length > 0) {
        detailList.push(fileName)
        fileWithMatch += 1
        totalMatch += fileMatches.length
        if (fileMatches.length > 0) {
          const mapped = fileMatches.map((fileMatch) => ({
            ...fileMatch.groups
          }))

          json.match = sortKeys(mapped, { deep: true })
          fs.writeFileSync(path.join(path.join(constants.OUT_ROOT_DIR_PATH, 'registry'), `${camelFile}.json`), JSON.stringify(json, null, 2))
        }
      }
    } catch(e) {
      if (e && e.message) {
        fs.writeFileSync(path.join(path.join(constants.OUT_ROOT_DIR_PATH, 'registry'), `${camelFile}.error.txt`), `${e.message}`)
      }
    }
    //
    walked += 1
  })
  console.log({ walked, fileWithMatch, totalMatch })
})
