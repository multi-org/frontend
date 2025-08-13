export function debounce<Func extends (...args: any[]) => void>(func: Func, wait: number) {
  let timeout: ReturnType<typeof setTimeout>

  const debounced = (...args: Parameters<Func>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced as typeof debounced & { cancel: () => void }
}