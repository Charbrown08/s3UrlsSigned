const type = (valType) => (key) => `The ${key} must be of type ${valType}`
const typeString = type('string')
const typeNumber = type('number')
const typeObject = type('object')
const minLength = (length) => (key) => `The ${key} must NOT be less than ${length} characters`
const maxLength = (length) => (key) => `The ${key} must NOT have more than ${length} characters`
const required = (key) => `The ${key} must be provided`
const empty = (key) => `The ${key} must NOT be empty`
const enums = (key) => (...values) => `The ${key} must be one of the following: ${values}`

module.exports = {
  type,
  typeString,
  typeNumber,
  typeObject,
  minLength,
  maxLength,
  required,
  empty,
  enums
}
