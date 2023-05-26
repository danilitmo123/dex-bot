import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: string[],
    space: string[],
    colors: Record<string, string>,
    button: Record<string, Record<string, string | number>>,
    transition: string,
    borderRadius: string,
    textShadow: string,
    opacity: string
  }
}
