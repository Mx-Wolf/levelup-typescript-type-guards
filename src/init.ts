import { BusinessForm, FieldMethods, Unsubscribe } from './i-face-methods';

const seed = ():Unsubscribe[] =>[];

const attachLifeCycle = (
  targetElement: Element | null,
  methods: FieldMethods):Unsubscribe[] =>{
  if(targetElement === null){
    return [];
  }
  throw new Error();
};

const makeReducer = (
  container:HTMLElement,
)=>(
  accumulator:Unsubscribe[],
  [key, methods]:[key:string, methods:FieldMethods],
)=>[...accumulator, ...attachLifeCycle(container.querySelector(`name=[${key}]`), methods)];

export const init = (container:HTMLElement, form:BusinessForm):Unsubscribe =>{
  const subscriptions:Unsubscribe[] = Object.entries(form).reduce(makeReducer(container),seed());
  return ()=>{subscriptions.forEach((subscription)=>subscription());};
};
