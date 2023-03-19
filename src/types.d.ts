declare module '*.ico' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.yaml' {
  const data: object;
  export default data;
}

declare module '@u-wave/react-translate' {
  import { Translator } from '@u-wave/translate';

  export function useTranslator(): Translator;
}
