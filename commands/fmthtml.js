const fs = require('fs')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')
const constants = require('../scripts/constants')

glob(`${constants.path.target.src}/**/*.js`, {
  ignore: [
    `${constants.path.target.src}/**/*.i18n.js`,
    `${constants.path.target.src}/**/__tests__/**/*`
  ]
}, (err, files) => {
  let walked = 1
  let fileWithMatch = 0
  let totalMatch = 0
  fs.mkdirSync(constants.path.out.registry, { recursive: true })
  files.forEach((fileName) => {
    try {
      let rawString = fs.readFileSync(fileName, { encoding: 'utf-8' })
      let file = fileName.replace(constants.path.target.src, '')
      let camelFile = _.camelCase(file)
      const regExp = /(?<all>(?<before>[\{\n\s]*)(?<main><FormattedHTMLMessage(?<props>.+)\/\>)(?<after>[\}\n\s]*))/g
      let fileMatches = [...rawString.matchAll(regExp)]
      const json = {
        file,
        match: []
      }
      if (fileMatches?.length > 0) {
        fileWithMatch += 1
        totalMatch += fileMatches.length
        if (fileMatches.length > 0) {
          const mapped = fileMatches.map((fileMatch) => {
            let props = {}
            if (fileMatch.groups) {
              props = fileMatch.groups.props

                let namedProps = props.matchAll(/(?<key>[\S]+(?=\=(?<value>[\S\.]+)))/g)
                namedProps = [...namedProps]
                namedProps = namedProps.map((item) => item.groups)

                let spreadProps = props.matchAll(/(?<spread>\{(?=\.\.\.)[\w\.]+\})/g)
                spreadProps = [...spreadProps]
                spreadProps = spreadProps.map((item) => item.groups)

              props = [...spreadProps, ...namedProps]
              return {
                ...fileMatch.groups,
                props,
              }
            }
            return fileMatch
          })

          json.match = mapped
          fs.writeFileSync(path.join(constants.path.out.registry, `${camelFile}.json`), JSON.stringify(json, null, 2))
          console
        }
      }
    } catch(e) {
      if (e && e.message) {
        fs.writeFileSync(path.join(constants.path.out.registry, `${camelFile}.error.txt`), `${e.message}`)
      }
    }
    //
    walked += 1
  })
  console.log({ walked, fileWithMatch, totalMatch })
})
