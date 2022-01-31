type DbValue = boolean| number| string | null;
type Row = Record<string,DbValue>
interface Context {
  name: string;
  row:Row;
}
export interface FieldMethods{
  format:(context: Context)=>Promise<string>;
  validate:(context: Context)=>Promise<boolean>;
  reduce: (context:Context, value: string)=>Promise<Context>;
}
