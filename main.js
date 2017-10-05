const initRecog = cb => {

  const commands = {
    'refresh page': () => { return window.location = window.location; },
    'open YouTube': () => { return window.open('https://www.youtube.com'); },
    'open Launchpad': () => { return window.open('https://www.cirr-lpld.herokuapp.com'); },
    'never going to give you up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },
    'Never Going to Give You Up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },  
    'Never Gonna Give You Up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },
    'Phil': () => { cb('phil is a shit b a')},
    'Peter': () => { cb('please no')},
    'Sam': () => { cb('do you want to go to starbucks')}
    
  }

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let p = document.createElement('li');
  p.classList = 'collection-item';
  const words = document.getElementById('content');
  words.appendChild(p);
  recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
      const poopScript = transcript.replace(/poop|poo|s\*\*\*|dump/gi, '💩');
      const samScript = poopScript.replace(/Sam|Samuel|theo|theobald/gi, 'theob0ss');
      // if ( transcript.match(/poop|poo|shit|dump/gi))
      p.textContent = samScript;
      if (transcript.match('Alexa')) p.textContent = 'Go away';
      if (e.results[0].isFinal) {
        Object.keys(commands).forEach(command => {
          if (transcript.match(command)) commands[command]()
        });
        p = document.createElement('li');
        p.classList = 'collection-item';
        words.appendChild(p);
      }
  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}



window.onload = () => {

  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('select');
  
  const speak = text => {
    const voices = window.speechSynthesis.getVoices();
    
    var utterThis = new SpeechSynthesisUtterance(text);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(let i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
  };

  synth.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
    for(let i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  const speechSynth = () => {
    const area = document.querySelector('textarea');
    const button = document.getElementById('speak');
    button.addEventListener('click', () => {
      speak(area.value);
    });
  }
  
 
  initRecog(speak);
  speechSynth(speak);
}