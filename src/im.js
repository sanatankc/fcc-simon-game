
const insert = (arr, index, item) => {
  const cpArr = [...arr]
  cpArr[index] = item
  return cpArr
}

const remove = (arr, index) => {
  const cpArr = [...arr]
  cpArr.splice(index, 1)
  return cpArr
}

export default {insert, remove}