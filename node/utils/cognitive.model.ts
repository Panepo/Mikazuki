export interface ResKeyPhrases {
  documents: DocKeyPhrases[],
  errors: string[]
}

interface DocKeyPhrases {
  id: string,
  keyPhrases: string[]
}

export interface ResLanguages {
  documents: DocLanguages[]
  errors: string[]
}

interface DocLanguages {
  id: string,
  detectedLanguages: {
    name: string,
    iso6391Name: string,
    score: number
  }
}
