/** Class representing speech recognition */
class SpeechRecog {
  /**
   * Constructor for SpeechRecog
   * Use:
   * const recog = new SpeechRecog({
   *  allowCommands: true,
   *  commands: {
   *      google: () => { window.open('google.com'); }
   *    }
   *  });
   * @param {Object} param0 Arguments
   */
  constructor({ allowCommands, commands } = { allowCommands: false, commands: [] }) {
    // Wrapper for vendor prefixes
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    // setup speech recognition
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    // bind the result handler for parsing the results
    this.handleResult = this.handleResult.bind(this);

    // add a handler for results
    this.recognition.addEventListener('result', this.handleResult);
    // make sure it's continuous
    this.recognition.addEventListener('end', this.recognition.start);
    this.recognition.start();

    // setup custom commands
    this.allowCommands = allowCommands;
    this.commandList = commands;

    // set up event listeners
    // list of objects of form [{ 'eventType', callback() }]
    this.eventListeners = [];
  }

  /**
   * Everytime there's a result from the speech recognition, parse it
   * Dispatch an event based with that parsed data
   * Handle any commands, if there exist any
   * @param {Object} event Event from speech recognition
   */
  handleResult(event) {
    // create an array from the results
    const transcript = [...event.results];
    // make the transcript readable
    const parsed = transcript.map(result => { return result[0].transcript; }).join('');
    const ret = { transcript: parsed };
    this.dispatch('interim', ret);
    // if it's final, emit a custom event with the parsed transcript
    // accessible from e.transcript
    if (event.results[0].isFinal) {
      // check if we allow commands, and if we do - run them
      if (this.allowCommands) this.handleCommands(parsed);
      this.dispatch('output', ret);
    }
  }

  /**
   * If commands are allowed, go through the list of commands and run the command
   * If the parameter contains one of the triggers, run the associated function
   * @param {String} voiceCommand A string to match to a command
   */
  handleCommands(voiceCommand) {
    const triggers = Object.keys(this.commandList);
    triggers.forEach(trigger => {
      if (voiceCommand.match(trigger)) {
        this.commandList[trigger]();
      }
    });
  }

  /**
   * Adds a listener with a type and an associated function, to run on that event
   * See this.dispatch
   * @param {String} type Type of event to listen for
   * @param {Function} cb Function to run on the event
   */
  addEventListener(type = 'output', cb) {
    this.eventListeners.push({
      type,
      cb,
    });
  }

  /**
   * Add a command to be run on a trigger
   * @param {Object} command New command to add
   */
  addCommand(command) {
    this.commandList.push(command);
  }

  /**
   * Dispatch an 'event'. Go through the list of event listeners
   * If the type is the same as the parameter passed, invoke that callback
   * @param {String} type The type of event
   * @param {Object} data Data to be passed to the callback
   */
  dispatch(type, data) {
    this.eventListeners.forEach(listener => {
      if (listener.type === type) {
        listener.cb(data);
      }
    });
  }
}
