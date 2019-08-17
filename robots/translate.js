const watsonApiKey = require('../credentials/watson-nlu.json').translateapikey
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')

const languageTranslator = new LanguageTranslatorV3({
  iam_apikey: watsonApiKey,
  version: '2019-04-02',
  url: 'https://gateway.watsonplatform.net/language-translator/api'
})

const state = require('./state.js')

async function robot () {
  const content = state.load()

  await translateSentences(content)

  state.save(content)

  async function translateSentences (content) {
    for (const sentence of content.sentences) {
      sentence.translate = await fetchWatsonAndReturnTranslate(sentence.text)
    }
  }

  async function fetchWatsonAndReturnTranslate (sentence) {
    return new Promise((resolve, reject) => {
      languageTranslator.translate(
        { text: sentence, model_id: 'en-pt', source: 'en-US', target: 'pt-BR' },
        (error, response) => {
          if (error) {
            throw error
          }

          const translate = response.translations[0].translation
          resolve(translate)
        }
      )
    })
  }
}

module.exports = robot
