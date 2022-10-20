import path from 'path'
import * as constants from '../lib/constants.js'

function extractImportedMessage(fileName, rawString) {
  let importedIntl = [...rawString.matchAll(constants.REGEX_STRING.importedIntl)]

  if (importedIntl.length > 0) {
    importedIntl = importedIntl.map((match) => {
      const groups = { ...match.groups }
      const source = path.resolve(path.dirname(fileName), `${groups.source}.js`)
      return {
        file: `file://${source}`,
        replace: groups.all,
        name: groups.name,
      }
    })
  }
  return importedIntl
}

export default extractImportedMessage
