export function checkStatus(response) {
  if (response.status >= 400) {
    const error = new Error(response.statusText)
    error.status = response.status
    error.response = response
    throw error
  }
  return response
}

export function parseJSON(response) {
  return response.json()
}

export default function request(url, options = {}) {
  const defaults = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  options = {
    ...defaults,
    ...options
  }

  if (options.body) {
    options.body = JSON.stringify(options.body)
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}