import { iCommand } from '../Typings/iCommand'

function capitalizeTheFirstLetterOfEachWord(words: string): string {
  let separateWord = words.toLowerCase().split(' ')
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
  }
  return separateWord.join(' ')
}

export default function (command: iCommand): string {
  return capitalizeTheFirstLetterOfEachWord(
    (command.permissions as string[]).join(', ').replace('_', ' ')
  )
}
