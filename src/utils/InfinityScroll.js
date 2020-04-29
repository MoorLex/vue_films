let loading = false

export default function (callback, offset = 0) {
  const listener = async () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight - offset) {
      if (!loading) {
        loading = true
        await callback()
        loading = false
      }
    }
  }
  window.addEventListener('scroll', listener, false)
  return () => { window.removeEventListener('scroll', listener, false) }
}
