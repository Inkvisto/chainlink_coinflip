import {cyan, gray, green, red, yellow} from "./colors.js";
import { figures } from "./figures.js";


// rendering user input.
export const styles = Object.freeze({
  password: { scale: 1, render: (input: string) => '*'.repeat(input.length) },
  emoji: { scale: 2, render: (input: string) => '😃'.repeat(input.length) },
  invisible: { scale: 0, render: (input: string) => '' },
  default: { scale: 1, render: (input: string) => `${input}` }
});


export const render = (type: string) => styles[type as keyof typeof styles] || styles.default;

// icon to signalize a prompt.
export const symbols = Object.freeze({
  aborted: red(figures.cross),
  done: green(figures.tick),
  exited: yellow(figures.cross),
  default: cyan('?')
});

export const symbol = (done: any, aborted: any, exited?: any) =>
  aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;

// between the question and the user's input.
export const delimiter = (completing: boolean) =>
  gray(completing ? figures.ellipsis : figures.pointerSmall);

export const item = (expandable: boolean, expanded: boolean) =>
  gray(expandable ? (expanded ? figures.pointerSmall : '+') : figures.line);




