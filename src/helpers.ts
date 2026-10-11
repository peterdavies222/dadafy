export function shuffle<T>(array: T[]): T[] {
  let arrayClone = array.slice();
  let newArray: T[] = [];

  for (let i = 0; i < array.length; i++) {
    let randomIndex = Math.floor(Math.random() * arrayClone.length);
    newArray.push(arrayClone[randomIndex]);
    arrayClone = arrayClone.filter((_, i) => i != randomIndex);
  }

  return newArray;
}
