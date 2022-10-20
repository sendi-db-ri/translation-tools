const idPrefix = ''

const REQUIRED = 'REQUIRED'
const ZIP_LENGTH = 'ZIP_LENGTH'
const PASSWORD_LENGTH = 'PASSWORD_LENGTH'
const PASSWORD_MATCH = 'PASSWORD_MATCH'
const VALID_EMAIL = 'VALID_EMAIL'

// defineMessages to keep the function as mapper
const defineMessages = (messages, final) => final ? (Object.entries(messages)) : messages

// entry start {{ENTRY}} //entry end
let final = []

// there is both au and my
if (typeof auMessages !== 'undefined' && typeof myMessages !== 'undefined') {
  /*
    value of:
    ../constants.js DEFAULT_LANG_MAP
  */
  if (lang === 'en-en')
  final = defineMessages({...myMessages, ...auMessages}, true)
  else
  final = defineMessages({...auMessages, ...myMessages}, true)

// only au
} else if (typeof auMessages !== 'undefined' && typeof myMessages === 'undefined') {
  final = defineMessages({...auMessages }, true)

// only my
} else if (typeof auMessages === 'undefined' && typeof myMessages !== 'undefined') {
  final = defineMessages({...myMessages }, true)

// no both but there is messages variable
} else if (typeof messages !== 'undefined') {
  final = defineMessages(messages, true)

} else {
  final = []
}