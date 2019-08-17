const robots = {
  input: require('./robots/input.js'),
  text: require('./robots/text.js'),
  translate: require('./robots/translate.js'),
  state: require('./robots/state.js'),
  image: require('./robots/image.js'),
  voice: require('./robots/voice.js'),
  video: require('./robots/video.js'),
  youtube: require('./robots/youtube.js')
}

const start = async () => {
  robots.input()
  await robots.text()
  await robots.translate()
  await robots.image()
  await robots.voice()
  await robots.video()
  await robots.youtube()
}
start()
