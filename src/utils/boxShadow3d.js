
const boxShadow3d = (offset, color) => {
  let css = ''
  for (let i = 1; i < offset + 1; i++) {
    css += `${i}px ${i}px 0px ${color}${(offset !== i) ? ', ' : ''}`
  }
  return css
}

export default boxShadow3d