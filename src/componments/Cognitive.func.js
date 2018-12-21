export const fetchApi = (data, provider, config) => {
  const headers = new Headers({
    'Ocp-Apim-Subscription-Key': config.apiKey[provider],
    'Content-Type': 'application/octet-stream'
  })

  return fetch(`${config.providerUrl[provider]}`, {
    method: 'POST',
    body: data,
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        return setErr()
      }
      return response.json()
    })
    .catch(() => setErr())
}

export const setErr = () => {
  return {
    err: true,
    description: {
      captions: [
        {
          text:
            'Hmmm something seems to be wrong... Maybe the file (at least 50*50px)? The Internet?'
        }
      ]
    }
  }
}

export const limitWidthHeight = (width, height, limit) => {
  if (width > height) {
    if (width > limit) {
      return [limit, (limit * height) / width]
    } else {
      return [width, height]
    }
  } else {
    if (height > limit) {
      return [(limit * width) / height, limit]
    } else {
      return [width, height]
    }
  }
}
