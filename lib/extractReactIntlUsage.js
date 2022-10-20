import * as constants from '../lib/constants.js'

function extractReactIntlUsage(rawString) {
  let reactIntlUsage = [...rawString.matchAll(constants.REGEX_STRING.reactIntlUsage)]

  if (reactIntlUsage.length > 0) {
    reactIntlUsage = reactIntlUsage.map((match) => {
      const groups = { ...match.groups }
      return {
        replace: groups.all,
        named: groups.named,
      }
    })
  }
  return reactIntlUsage
}

export default extractReactIntlUsage
