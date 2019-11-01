/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'devextreme/localization/messages/*' {
  const value: any;
  export = value;
}
declare module '*.json' {
  const value: any;
  export default value;
}
