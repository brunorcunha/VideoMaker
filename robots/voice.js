const fs = require('fs')
const watsonApiKey = require('../credentials/watson-nlu.json').speechapikey
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')

const textToSpeech = new TextToSpeechV1({
  iam_apikey: watsonApiKey,
  url: 'https://stream.watsonplatform.net/text-to-speech/api'
})

const state = require('./state.js')

async function robot () {
  const content = state.load()

  await speakSentences(content)

  state.save(content)

  async function speakSentences (content) {
    for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
      let sentenceText = content.sentences[sentenceIndex].translate
      await fetchWatsonAndReturnAudio(sentenceIndex, sentenceText)
    }
  }

  async function fetchWatsonAndReturnAudio (index, sentence) {
    return new Promise((resolve, reject) => {
      textToSpeech.synthesize(
        { text: sentence, accept: 'audio/mp3', voice: 'pt-BR_IsabelaVoice' },
        (error, response) => {
          if (error) {
            throw error
          }

          fs.writeFile(`./content/${index}.mp3`, response, 'binary', (err) => {
            if (err) {
              console.error('ERROR:', err)
              return
            }
            console.log(`Audio gravado: ${index}.mp3`)
          })
          resolve()
        }
      )
    })
  }
}

module.exports = robot
