export default function rangeMap(n, fn) {
  const arr = []
  while (n > arr.length) {
    arr.push(fn(arr.length))
  }
  return arr
}
