import fs from 'fs'
import path from 'path'
import glob from 'glob'
import constants from '../scripts/constants.js'
import toJson from '../scripts/toJson.js'

glob(`${constants.path.target.pages}/**/*.i18n.js`, {}, (er, files) => {
  const langs = ['enEn', 'enMy']
  langs.forEach((lang) => {
    files.forEach((item) => {
      try {
        const { rawString, evaluated } = toJson(item, lang)

        let out = item.replace(constants.path.target.pages, '')
        out = out.split('/')
        const name = out.pop()
        out = out.join('/')

        // write debug file
        const outputDebug = path.join(constants.path.out.debug, 'pages', out)
        fs.mkdirSync(outputDebug, { recursive: true })
        fs.writeFileSync(path.join(outputDebug, `${name}`), rawString)

        // write result file
        const outputLang = path.join(constants.path.out.lang, 'pages', out)
        fs.mkdirSync(outputLang, { recursive: true })
        fs.writeFileSync(path.join(outputLang, `${name}.${lang}.json`), evaluated)

      } catch (e) {
        if (e && e.message) {
          console.log(item)
          console.log(`message: ${e.message}`)
        }
      }
    })
  })
})

glob(`${constants.path.target.components}/**/*.i18n.js`, {}, (er, files) => {
  const langs = ['enEn', 'enMy']
  langs.forEach((lang) => {
    files.forEach((item) => {
      try {
        const { rawString, evaluated } = toJson(item, lang)

        let out = item.replace(constants.path.target.components, '')
        out = out.split('/')
        const name = out.pop()
        out = out.join('/')

        // write debug file
        const outputDebug = path.join(constants.path.out.debug, 'components', out)
        fs.mkdirSync(outputDebug, { recursive: true })
        fs.writeFileSync(path.join(outputDebug, `${name}`), rawString)

        // write result file
        const outputLang = path.join(constants.path.out.lang, out)
        fs.mkdirSync(outputLang, { recursive: true })
        console.log(outputLang)
        fs.writeFileSync(path.join(outputLang, `${name}.${lang}.json`), evaluated)

      } catch (e) {
        if (e && e.message) {
          console.log(item)
          console.log(`message: ${e.message}`)
        }
      }
    })
  })
})
