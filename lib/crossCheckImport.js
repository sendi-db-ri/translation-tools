import path from 'path'
import * as str from '../lib/stringHelper.js'

//  && fn.match(/.*(pages|components).*/g)

const crossCheckImport = (fn, rs, i, files) => {
  const x = [...rs.matchAll(/(?<all>import.+from[\s\n]*'(?<path>.+)';)/g)]
  let check = x
  if (check.length > 0) {
    check
      .map((match) => ({ ...match.groups }.path ?? ''))
      .filter((val) => (val.includes('components') || val.includes('pages')))
      .filter((val) => `${val}`.startsWith('.') && !val.includes('i18n') && !val.includes('translates'))
      .map((val) => path.resolve(path.dirname(fn), val))
      .map(str.stripSrc)
      .map(str.stripLeadSlash)
      .forEach((el) => {
        let y = fn
        // if (el.includes('components/layout/Alerts/FundingAlertsModal')) {
          // console.log(fn)
          // console.log(el)
          // console.log(x.map((match) => ({ ...match.groups }.path ?? '')))
          y = str.stripLast(str.stripLeadSlash(str.stripSrc(fn)))
        // }
      i[el] = [...(i?.[el] ?? []), y]
    })
  }
}

export default crossCheckImport
