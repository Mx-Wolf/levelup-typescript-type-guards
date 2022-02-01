import { attachButton } from './attach-button';
import { attachFieldset } from './attach-fieldset';
import { attachInput } from './attach-input';
import { attachOutput } from './attach-output';
import { attachSelect } from './attach-select';
import { attachTextarea } from './attach-textarea';
import { FieldMethods, Unsubscribe } from './i-face-methods';

const honoredKeys = [
  'button',
  'fieldset',
  'input',
  'output',
  'select',
  'textarea',
] as const;

type HonoredElements = Pick<HTMLElementTagNameMap, typeof honoredKeys[number]>

type HonoredGuards = {
  [k in keyof HonoredElements]: (element: Element) => element is HTMLElementTagNameMap[Lowercase<k & string>]
}

type HonoredAttach = {
  [k in keyof HonoredElements]: (element: HonoredElements[k], methods: FieldMethods) => void;
}

const guards: HonoredGuards = honoredKeys.reduce((a, b) => {
  a[b] = (element): element is never => element.tagName.toLowerCase() === b;
  return a;
}, {} as HonoredGuards);

const attach: HonoredAttach = {
  button: attachButton,
  fieldset: attachFieldset,
  input: attachInput,
  output: attachOutput,
  select: attachSelect,
  textarea: attachTextarea
};

export const attachMethods = (element: Element, methods: FieldMethods): Unsubscribe[] => {


  honoredKeys.some((k) => {
    if (guards[k](element)) {
      attach[k](element as never, methods);
    }
  });

  if (guards.button(element)) {
    attach.button(element, methods);
    return attachButton(element, methods);
  }
  if (guards.fieldset(element)) {
    return attachFieldset(element, methods);
  }
  if (guards.input(element)) {
    return attachInput(element, methods);
  }
  if (guards.output(element)) {
    return attachOutput(element, methods);
  }
  if (guards.select(element)) {
    return attachSelect(element, methods);
  }
  if (guards.textarea(element)) {
    return attachTextarea(element, methods);
  }
  return [];
};
