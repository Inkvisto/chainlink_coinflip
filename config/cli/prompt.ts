import { emitKeypressEvents } from 'readline';
import { createInterface } from 'readline/promises';;
import EventEmitter from 'events';

import { cursor } from './utils/cursor.js';
import keysAbbr from './utils/keyPress.js';

class Prompt extends EventEmitter {
  input: NodeJS.ReadStream;
  output: NodeJS.WriteStream;
  onRender: () => void;
  close: () => void;
  aborted: boolean;
  exited: boolean;
  value: any;
  firstRender: boolean;
  closed: boolean;
  _: any;


  constructor(opts: any = {}) {
    super();
    this.input = opts.stdin || process.stdin;
    this.output = opts.stdout || process.stdout;
    this.aborted = false;
    this.exited = false;
    this.firstRender = true;
    this.value = null;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);
    this.closed = false;

    const rl = createInterface({ input: this.input, escapeCodeTimeout: 50 });

    emitKeypressEvents(this.input, rl);

    if (this.input.isTTY) this.input.setRawMode(true);
    const keypress = (str: string, key: any) => {
      let action: any = keysAbbr(key);



      if (action === false) {
        this._ && this._(str, key);
      } else if (typeof this[action as keyof typeof this] === 'function') {
        (this as any)[action as keyof typeof this](key);
      } else {
        this.output.write('\u0007');
      }
    }


    this.close = () => {
      this.output.write(cursor.show);
      this.input.removeListener('keypress', keypress);
      if (this.input.isTTY) this.input.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : this.exited ? 'exit' : 'submit', this.value);
      this.closed = true;
    }

    this.input.on('keypress', keypress);


  }


  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted,
      exited: !!this.exited
    });
  }

  render() {
    this.onRender();
    if (this.firstRender) this.firstRender = false;
  }
};

export default Prompt;