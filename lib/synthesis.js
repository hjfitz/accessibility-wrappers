export default class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;

    this.synth.onvoiceschanged = this.populateVoiceList;

    this.voiceList = this.synth.getVoices();
    [this.voice] = this.voiceList;
  }

  /**
   * Creats a dropdown with voices and give the opportunity to change the voice
   * @param {DOMElement} elem element to create a dropdown
   */
  createDropdown(elem) {
    this.voiceList.forEach(voice => {
      const opt = document.createElement('option');
      opt.textContent = `${voice.name} - (${voice.lang})`;
      elem.appendChild(opt);
    });
  }

  /**
   * Set a voice
   */
  set voice(voice) {
    this.voice = voice;
  }

  /**
   * Say a thing
   * @param {string} text Thing to say
   */
  say(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    this.synth.speak(utterance);
  }

}
