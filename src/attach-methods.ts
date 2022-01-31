import { attachButton } from './attach-button';
import { attachFieldset } from './attach-fieldset';
import { attachInput } from './attach-input';
import { attachOutput } from './attach-output';
import { attachSelect } from './attach-select';
import { attachTextarea } from './attach-textarea';
import { FieldMethods, Unsubscribe } from './i-face-methods';
const enum HonoredTags {
  BUTTON = 'BUTTON',
  FIELDSET = 'FIELDSET',
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  SELECT = 'SELECT',
  TEXTAREA = 'TEXTAREA',
}

const guards = {
  button:(element:Element):element is HTMLButtonElement => element.tagName ===HonoredTags.BUTTON,
  fieldset:(element:Element):element is HTMLFieldSetElement => element.tagName ===HonoredTags.FIELDSET,
  input:(element:Element):element is HTMLInputElement => element.tagName ===HonoredTags.INPUT,
  output:(element:Element):element is HTMLOutputElement => element.tagName ===HonoredTags.OUTPUT,
  select:(element:Element):element is HTMLSelectElement => element.tagName ===HonoredTags.SELECT,
  textarea: (element:Element):element is HTMLTextAreaElement => element.tagName ===HonoredTags.TEXTAREA,
};


export const attachMethods = (element:Element, methods:FieldMethods):Unsubscribe[]=>{

  if(guards.button(element)){
    return attachButton(element, methods);
  }
  if(guards.fieldset(element)){
    return attachFieldset(element, methods);
  }
  if(guards.input(element)){
    return attachInput(element, methods);
  }
  if(guards.output(element)){
    return attachOutput(element, methods);
  }
  if(guards.select(element)){
    return attachSelect(element, methods);
  }
  if(guards.textarea(element)){
    return attachTextarea(element, methods);
  }
  return [];
};
