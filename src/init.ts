import { BusinessForm, FieldMethods, Unsubscribe } from './i-face-methods';

const seed = ():Unsubscribe[] =>[];

const makeReducer = (
  container:HTMLElement,
)=>(
  accumulator:Unsubscribe[],
  entry:[key:string, methods:FieldMethods],
)=>accumulator;

export const init = (container:HTMLElement, form:BusinessForm):Unsubscribe =>{
  const subscriptions:Unsubscribe[] = Object.entries(form).reduce(makeReducer(container),seed());
  return ()=>{subscriptions.forEach((subscription)=>subscription());};
};
