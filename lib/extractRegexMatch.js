import sortKeys from 'sort-keys'
import * as constants from '../lib/constants.js'

export function extractFormattedMessage(fileName, rawString) {

  let matches = [...rawString.matchAll(constants.REGEX_STRING.formattedMessage)]

  if (matches?.length > 0) {
    matches = matches.map((value) => {
      let group = { ...value.groups }
      group.main_regex = group.main
      group.main_clean = group.main.replaceAll(/\s\s+/g, ' ').trim()
      group.all_regex = group.all
      group.all_clean = group.all.replaceAll(/\s\s+/g, ' ').trim()
      group = sortKeys(group, { deep: true })

      // if (!group.before.includes('{') && group.after.includes('}')) console.log('no before', fileName)
      // if (group.before.includes('{') && !group.after.includes('}')) console.log('no after', fileName)

      return group
    })
  }


  return matches
}

export function extractFormattedHtmlMessage(fileName, rawString) {

  let matches = [...rawString.matchAll(constants.REGEX_STRING.formattedHtmlMessage)]

  if (matches?.length > 0) {
    matches = matches.map((value) => {
      let group = { ...value.groups }
      group = sortKeys(group, { deep: true })

      // if (!group.before.includes('{') && group.after.includes('}')) console.log('no before', fileName)
      // if (group.before.includes('{') && !group.after.includes('}')) console.log('no after', fileName)

      return group
    })
  }


  return matches
}
