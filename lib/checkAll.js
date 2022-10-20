
function checkAllFormattedMessage(rawString) {
  const formattedMessageRegex = /<FormattedMessage/g

  const formattedMessageMatch = [...rawString.matchAll(formattedMessageRegex)]
  return formattedMessageMatch.length
}

function checkAllFormattedHtmlMessage(rawString) {
  const formattedHtmlMessageRegex = /<FormattedHtmlMessage/g

  const formattedHtmlMessageMatch = [...rawString.matchAll(formattedHtmlMessageRegex)]
  return formattedHtmlMessageMatch.length
}

export { checkAllFormattedMessage, checkAllFormattedHtmlMessage }