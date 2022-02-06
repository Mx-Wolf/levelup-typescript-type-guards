import { Unsubscribe } from './i-face-binder';
import { ListenerFactory } from './i-face-listener-factory';

interface AttachListener {
  (target: HTMLButtonElement, name: 'click', listener: ReturnType<ListenerFactory['makeButtonClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'click', listener: ReturnType<ListenerFactory['makeInputClick']>): Unsubscribe;
  (target: HTMLInputElement, name: 'input', listener: ReturnType<ListenerFactory['makeInputInput']>): Unsubscribe;
  (target: HTMLSelectElement, name: 'input', listener: ReturnType<ListenerFactory['makeSelectInput']>): Unsubscribe;
  (target: HTMLTextAreaElement, name: 'input', listener: ReturnType<ListenerFactory['makeTextAreaInput']>): Unsubscribe;
}

const isButton = (element: Element): element is HTMLButtonElement => element.tagName === 'BUTTON';
const isInput = (element: Element): element is HTMLInputElement => element.tagName === 'INPUT';
const isCheckBox = (element: HTMLInputElement): boolean => element.type === 'checkbox';
const isSelect = (element: Element): element is HTMLSelectElement => element.tagName === 'SELECT';
const isTextArea = (element: Element): element is HTMLTextAreaElement => element.tagName === 'TEXTAREA';

const attachByName: AttachListener = (target, name, handler) => {
  target.addEventListener(name, handler as never);
  return ()=>target.removeEventListener(name, handler as never);
};

const attach = (target: Element, methods: ListenerFactory): Unsubscribe => {
  if (isButton(target)) {
    return attachByName(target, 'click', methods.makeButtonClick());
  }
  if (isInput(target)) {
    if(isCheckBox(target)){
      return attachByName(target, 'click', methods.makeInputClick());
    }
    return attachByName(target, 'input', methods.makeInputInput());
  }
  if(isSelect(target)){
    return attachByName(target,'input', methods.makeSelectInput());
  }
  if(isTextArea(target)){
    return attachByName(target,'input',methods.makeTextAreaInput());
  }
  throw new Error(`unexpected target type ${target.tagName}`);
};

export const detectBindElement = (
  targetElement: Element | null,
  methods: ListenerFactory): Unsubscribe[] => targetElement === null ? [] : [attach(targetElement, methods)];
