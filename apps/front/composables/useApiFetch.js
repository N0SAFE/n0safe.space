export default function () {
  const config = useRuntimeConfig()
  const baseApiUrl = config.public.apiUrl
  return function (path, options) {
    if (path.startsWith('/')) {
      path = path.slice(1)
    }
    path = `${baseApiUrl}/${path}`
    options = options || {}
    options.credentials = 'include'
    return fetch(path, options)
  }
}
