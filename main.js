
const synth = window.speechSynthesis;
  

const initRecog = () => {

  const commands = {
    'refresh page': () => { return window.location = window.location; },
    'open YouTube': () => { return window.open('https://www.youtube.com'); },
    'open Launchpad': () => { return window.open('https://www.cirr-lpld.herokuapp.com'); },
    'never going to give you up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },
    'Never Going To Give You Up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },  
    'Never Gonna Give You Up': () => { return window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); },
    'Phil': () => { synth.speak(new SpeechSynthesisUtterance('phil is a shit b a'))},
    'Peter': () => { synth.speak(new SpeechSynthesisUtterance('please no'))}    
    
  }

  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let p = document.createElement('p');
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
        p = document.createElement('p');
        words.prepend(p);
      }
  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}

const speechSynth = () => {
  const area = document.querySelector('textarea');
  const button = document.getElementById('speak');
  button.addEventListener('click', () => {
    const toSpeak = area.value;
    console.log(toSpeak);
    const utter = new SpeechSynthesisUtterance(toSpeak);
    synth.speak(utter);
  });
}

window.onload = () => {
  initRecog();
  speechSynth();
}