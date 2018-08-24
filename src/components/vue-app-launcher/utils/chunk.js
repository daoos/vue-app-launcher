export default function chunk (array, size) {
  const length = array.length
  if (!length || !size || size < 1) return []
  let index = 0
  let resIndex = 0
  let result = new Array(Math.ceil(length / size))
  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}
