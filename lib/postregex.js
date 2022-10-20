const clean = (item, target) => {
  const [key, value] = item
  let rawString = value
  let cleaned = rawString

  try {
    if (rawString === undefined) rawString = ''
    const r = /\U+0421/g
    const v = r.exec(r)
    if (v !== null) {
      console.log(target)
    }
    cleaned = rawString.replace(/\U+0421/, 'C')
  } catch (e) {
    console.log(target, key, value)
  }
  return [key, cleaned]
}

export default clean
