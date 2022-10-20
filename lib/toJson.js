import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import sortKeys from 'sort-keys'

import constants from './constants.js'
import postregex from './postregex.js'

const toJson = (target, lang = 'enEn') => {
  let rawString = fs.readFileSync(target, { encoding: 'utf-8' })

  let wrapper = fs.readFileSync(path.join(constants.path.scripts, 'wrapper.js'), { encoding: 'utf-8' })

  /* REGEX PREPROCESS */

  // if (target.includes('Input.i18n')) {
    // 0. remove import constants
    rawString = rawString.replace(/^import.*[\s\S]+';/gm, '')
  // }

  // 1. remove import
  rawString = rawString.replace(/^import.*\s/gm, '')

  // 2. remove export
  rawString = rawString.replace(/^export\s+default.*\s/gm, '')

  // 3. remove ** auMessages; on end
  rawString = rawString.replace(/.*auMessages;$\s/gm, '')

  // 4. remove eslint
  rawString = rawString.replace(/^\/\*\s*eslint.*\s/gm, '')

  // 5. replace ${CURRENCY_SYMBOL}
  rawString = rawString.replace(/\$\{CURRENCY_SYMBOL\}/gm, '{{currency_symbol}}')

  // 6. replace ${CURRENCY_SYMBOL}
  rawString = rawString.replace(/\$\{PLATFORM_LINK_MY\}/gm, '{{platform_link_my}}')

  // 7. wrap inside `./constant.js`
  rawString = wrapper.replace('{{ENTRY}}', `
const lang='${lang === 'enEn' ? 'enEn' : 'enMy'}'${rawString}`)

try {
  let evaluated = eval(rawString)

  // remove id from object value
  evaluated = evaluated.map(([key, value]) => [key, value.defaultMessage ? value.defaultMessage : ''])

  // pass to postregex script
  evaluated = evaluated.map((item) => postregex(item, target))

  // reverse to object
  evaluated = Object.fromEntries(evaluated)

  evaluated = sortKeys(evaluated, { deep: true })

  // stringify to json
  evaluated = JSON.stringify(evaluated, null, 2)

  // return both
  return { rawString, evaluated }
} catch (error) {
  console.log({ target })
  let x = target.replace(constants.path.target.src, '')
  x = _.camelCase(x)
  console.log(x)
  fs.mkdirSync(constants.path.out.error, { recursive: true })
  fs.writeFileSync(path.join(constants.path.out.error, `${x}.js`), rawString)
  if (error && error.message) console.warn({ message: error.message })
  else console.warn({ error })
}
}

export default toJson
