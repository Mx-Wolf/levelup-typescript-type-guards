import { FieldMethods, Unsubscribe } from './i-face-methods';

export const attachButton = (element:HTMLButtonElement, methods:FieldMethods): Unsubscribe[]=>{
  throw new Error();
};

export const isButton = (element:Element):element is HTMLButtonElement => element.tagName === 'BUTTON';

export const Probe = (element:Element, methods: FieldMethods):boolean=>{
  if(isButton(element)){
    return attachButton(element, methods),true;
  }
  return false;
};
