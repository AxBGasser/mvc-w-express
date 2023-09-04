export function capitalizeWord(word) {
  let words = word.split(' ')

  words = words.map((palabra) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  return words.join(' ')
}
