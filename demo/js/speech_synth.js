class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voiceList = [];

    this.populateVoiceList = this.populateVoiceList.bind(this);
    this.synth.onvoiceschanged = this.populateVoiceList;
  }

  populateVoiceList() {
    this.voiceList = this.synth.getVoices();
    this.voice = this.voiceList[0];
  }

  createDropdown(elem, locale) {
    const voices = locale 
                  ? this.voiceList.fitler(voice => voice.locale === locale) 
                  : this.voiceList;

    this.voiceList.forEach(voice => {
      const opt = document.createElement('option');
      opt.textContent = `${voice.name} - (${voice.lang})`;
      elem.appendChild(opt);      
    });
  }

  setVoice(voice, elem) {
    this.voice = voice;
  }

  say(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    this.synth.speak(utterance);
  }

}