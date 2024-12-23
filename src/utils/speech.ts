export function speak({
  text,
  voice,
}: { text: string; voice?: SpeechSynthesisVoice }) {
  const utterance = new SpeechSynthesisUtterance(text)
  if (voice) {
    utterance.voice = voice
  }
  window.speechSynthesis.speak(utterance)
}

export function cancel() {
  window.speechSynthesis.cancel()
}
