export const cognitiveApi = (url, headers, data, err) => {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: data
  })
    .then(response => {
      if (!response.ok) {
        return cognitiveErr(err)
      }
      return response.json()
    })
    .catch(() => cognitiveErr(err))
}

export const cognitiveErr = message => {
  return {
    err: true,
    description: {
      captions: [
        {
          text: message
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

export const genTextBody = text => {
  return JSON.stringify({
    documents: [
      {
        language: 'en',
        id: '1',
        text: text
      }
    ]
  })
}
