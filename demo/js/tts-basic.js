// shamelessly borrowed from Wesbos
// youtube.com/user/wesbos

const initRecog = cb => {

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
          if (transcript.match(command)) commands[command](transcript);
        });
        p = document.createElement('li');
        p.classList = 'collection-item';
        words.appendChild(p);
      }
  });
  recognition.addEventListener('end', recognition.start);
  recognition.start();
}