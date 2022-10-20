import sortKeys from 'sort-keys'
import * as str from './stringHelper.js'
import * as constants from './constants.js'
import mapper from './mapper.js'

const extractDefault = (input, lang, fn, sort = true) => {
  let processed = input

  const defaultLang = Object.values(constants.DEFAULT_LANG_MAP)

  try {
    
    processed = str.removeImportedContant(processed)
    processed = str.removeImport(processed)
    processed = str.removeExport(processed)
    processed = str.removeAuMessageToEnd(processed)
    processed = str.removeEslint(processed)
    processed = str.replaceCurrencySymbol(processed)
    processed = str.replacePlatformLink(processed)

    // wrap in a template, dont want to regex all
    if (defaultLang.includes(lang)) {
      processed = str.wrapDefault(processed, lang)

      // only tools, ok to eval
      processed = eval(processed)

      // stub empty defaultMessage
      processed = processed.map(([key, value]) => [key, value.defaultMessage ? value.defaultMessage : ''])
  
    } else {
      processed = str.removeIdPrefix(processed)
      processed = str.wrapNonDefault(processed)
      processed = eval(processed)
    }

    processed = processed.map(mapper(lang, fn))

    // to object
    processed = Object.fromEntries(processed)

    
    // sort key
    if (sort) processed = sortKeys(processed)

  } catch (e) {
    console.log(e)
  }


  return processed
}

export default extractDefault
