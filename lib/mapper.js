export default (lang) => ([key, value]) => {
  let newValue = value

  return [key, { [lang]: newValue }]
}