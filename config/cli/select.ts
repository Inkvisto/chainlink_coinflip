import { Stream } from 'stream';


import { delimiter, symbol } from './utils/styles.js';
import { figures } from './utils/figures.js';
import { cursor, erase } from './utils/cursor.js';
import { bold, cyan, gray, yellow } from './utils/colors.js';
import Prompt from './prompt.js';


const entriesToDisplay = (cursor: any, total: any, maxVisible: any) => {
  maxVisible = maxVisible || total;

  let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
  if (startIndex < 0) startIndex = 0;

  let endIndex = Math.min(startIndex + maxVisible, total);

  return { startIndex, endIndex };
};



const strip = (str: string) => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|');

  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};



const width = (str: string) => strip(str).length;

const clear = function (prompt: any, perLine: any) {
  if (!perLine) return erase.line + cursor.to(0);

  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }

  return erase.lines(rows);
};

const wrap = (msg: any, opts: any = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin))
    ? new Array(parseInt(opts.margin)).fill(' ').join('')
    : (opts.margin || '');

  const width = opts.width;

  return (msg || '').split(/\r?\n/g)
    .map((line: string) => line
      .split(/\s+/g)
      .reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else arr.push(`${tab}${w}`);
        return arr;
      }, [tab])
      .join('\n'))
    .join('\n');
};



class SelectPrompt extends Prompt {
  msg: string;
  hint: string;
  warn: string;
  cursor: number;
  choices: any[];
  optionsPerPage: number;
  clear: string;
  done: boolean;
  outputText: string;

  constructor(opts: any = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch: any, idx: number) => {
      if (typeof ch === 'string')
        ch = { title: ch, value: idx };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value === undefined ? idx : ch.value),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('', this.output.columns);
    this.done = false;
    this.outputText = '';
    this.render();
  }

  moveCursor(n: number) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  exit() {
    this.abort();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.output.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.output.write('\n');
      this.close();
    } else
      this.output.write('\u0007');
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.moveCursor(this.choices.length - 1);
    } else {
      this.moveCursor(this.cursor - 1);
    }
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) {
      this.moveCursor(0);
    } else {
      this.moveCursor(this.cursor + 1);
    }
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _ = (c: string, key: string) => {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) {
      this.output.write(cursor.hide)
    } else {
      this.output.write(clear(this.outputText, this.output.columns))
    }
    super.render();

    let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);

    // Print prompt
    this.outputText = [
      symbol(this.done, this.aborted),
      bold(this.msg),
      delimiter(false),
      this.done ? this.selection.title : this.selection.disabled
        ? yellow(this.warn) : gray(this.hint)
    ].join(' ');
    // Print choices
    if (!this.done) {
      this.outputText += '\n';
      for (let i = startIndex; i < endIndex; i++) {
        let title, prefix, desc = '', v = this.choices[i];

        // Determine whether to display "more choices" indicators
        if (i === startIndex && startIndex > 0) {
          prefix = figures.arrowUp;
        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
          prefix = figures.arrowDown;
        } else {
          prefix = ' ';
        }

        if (v.disabled) {
          title = this.cursor === i ? gray(v.title) : gray(v.title);
          prefix = (this.cursor === i ? gray(figures.pointer) + ' ' : '  ') + prefix;
        } else {
          title = this.cursor === i ? cyan(v.title) : v.title;
          prefix = (this.cursor === i ? cyan(figures.pointer) + ' ' : '  ') + prefix;
          if (v.description && this.cursor === i) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.output.columns
              || v.description.split(/\r?\n/).length > 1) {
              desc = '\n' + wrap(v.description, { margin: 3, width: this.output.columns });
            }
          }
        }

        this.outputText += `${prefix} ${title}${gray(desc)}\n`;
      }
    }

    this.output.write(this.outputText);
  }
}



type SelectArgsType = {
  name: string;
  message: string;
  choices: any[],
  initial?: number,
  hint?: string,
  onState?: () => void;
  stdin?: Stream;
  stdout?: Stream;
}



export const Select = async (args: SelectArgsType, opts: any = {}) => {

  const funcVoid = (v: any) => v;
  const eventFunc = async (x: any, cb: any) =>  cb === undefined ? funcVoid(x) : await cb(x);

  return new SelectPrompt(args)
    .on('state', args.onState ?? funcVoid)
    .on('submit', (x) => eventFunc(x, opts.onSubmit) )
    .on('exit', (x) => eventFunc(x, opts.onExit))
    .on('abort', (x) => eventFunc(x, opts.onAbort))
}

export default Select;







