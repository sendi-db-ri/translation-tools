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
}, (er, files) => {
  let walked = 1
  let found = false
  let have = 0
  let count = 0
  fs.mkdirSync(constants.path.out.registry, { recursive: true })
  files.forEach((file) => {
    try {
      let rawString = fs.readFileSync(file, { encoding: 'utf-8' })
      const regExp = /FormattedMessage/i
      // const regExp = /(?<all>(?<before>[\{\n\s]*)(?<main><FormattedMessage(?<props>.+)\/\>)(?<after>[\}\n\s]*))/g
      let z = [...rawString.matchAll(regExp)]
      // const tgt = {
      //   file,
      //   elements: []
      // }
      if (z?.length > 0) {
        have += 1
        count += z.length
        // const elements = z.map((v) => {
        //   let props = v.groups.props
        //   props = props.trim()
        //   return {
        //     ...v.groups,
        //     props,
        //     multiProps: props.includes('=')
        //   }
        // })

        // const multi = elements.filter((element) => element.multiProps)
        // if (multi.length > 0) {
        //   console.log(walked)
        // }

        // tgt.elements = elements
        // fs.writeFileSync(path.join(constants.path.out.registry, `${walked}.txt`), JSON.stringify(tgt, null, 2))
      }
    } catch (e) {
      if (e && e.message) {
        console.log(file)
        console.log(e.message)
      }
    }
    walked += 1
  })
  console.log({ walked, have, count })
})
