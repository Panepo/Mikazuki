import fetch from 'node-fetch'

export default async function cognitiveApi(
  azureUrl: string,
  params: string,
  key: string,
  data: string
) {
  const url = analysisParams(azureUrl, params)

  if (url) {
    return fetch(url, {
      method: 'POST',
      headers: getHeader(key),
      body: data
    })
      .then(res => {
        if (!res.ok) {
          return getError('Connection Error')
        }
        return res.json()
      })
      .catch(err => getError(err))
  } else {
    getError('[ERROR] Azure cognitive service selection is required.')
  }
}

function analysisParams(azureUrl: string, params: string) {
  switch (params) {
    case 'languages':
      return azureUrl + 'languages?showStats=True'
    case 'keyPhrases':
      return azureUrl + 'keyPhrases?showStats=True'
    default:
      return null
  }
}

// request headers
function getHeader(key: string) {
  return {
    'Ocp-Apim-Subscription-Key': key,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

// response errors
function getError(message: string) {
  return {
    err: true,
    description: message
  }
}
